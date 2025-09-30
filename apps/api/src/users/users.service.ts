import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/Dto/create-user';
import { PrismaService } from 'src/prisma/prisma.service';
import { EntityType, MediaPurpose, Role } from '@prisma/client';
import { MediaService } from 'src/media/media.service';
import { CreateCustomerDto } from './Dto/create-customer';
import { UserMapper } from './Mapper/usersMapper';
import { CreateStaffDto } from './Dto/create-staff.dto';
import { UpdateStaffDto } from './Dto/update-staff.dto';
import { EmailService } from 'src/email/email.service';
import crypto from "crypto";


@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private mediaService: MediaService,
    private emailService: EmailService,
  ) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  async createCustomer(dto: CreateCustomerDto, hashedPassword: string) {
    return this.prisma.user.create({
      data: {
        ...dto,
        role: Role.USER,
        password: hashedPassword,
      },
    });
  }

  async createUser(dto: CreateUserDto, hashedPassword: string) {
    return this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });
  }

  async registerCustomer(dto: CreateCustomerDto) {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) throw new UnauthorizedException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const savedUser = await this.createCustomer(dto, hashedPassword);

    return savedUser;
  }

  async registerUser(dto: CreateUserDto) {
    const existingUser = await this.findByEmail(dto.email);

    if (existingUser) throw new UnauthorizedException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const savedUser = await this.createUser(dto, hashedPassword);

    return savedUser;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getAllStaff() {
    const staff = await this.prisma.user.findMany({
      where: {
        role: {
          in: [Role.ADMIN, Role.WAITER, Role.SUPER_ADMIN],
        },
      },
    });

    const staffDto = staff.map((user) => UserMapper.toResponse2(user));
    return staffDto;
  }

  async getStaffById(id: string) {
    const staff = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!staff) throw new NotFoundException('Staff not found');
    return staff;
  }

  async createStaff(dto: CreateStaffDto) {
    const existingUser = await this.findByEmail(dto.email);
    if (existingUser) throw new UnauthorizedException('Email already exists');

    try {
      const { avatar, ...newStaffData } = dto;
      const hashedPassword = await bcrypt.hash(newStaffData.password, 10);
      const savedUser = await this.createUser(newStaffData, hashedPassword);

      if (avatar?.s3Key) await this.mediaService.confirmPendingMedia(avatar?.s3Key, savedUser.id);

      return savedUser;
    } catch (e) {
      console.log(e.message);
      throw new InternalServerErrorException(e.message);
    }
  }

  async updateStaff(id: string, dto: UpdateStaffDto) {
    const existingUser = await this.findById(id);
    if (!existingUser) throw new NotFoundException('User not found');

    try {
      const savedUser = await this.prisma.user.update({
        where: { id },
        data: {
          ...dto,
        },
      });
      return savedUser;
    } catch (e) {
      console.log(e.message);
      throw new InternalServerErrorException(e.message);
    }
  }

  async deleteStaff(id: string, userRole: Role) {
    const userToDelete = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!userToDelete) throw new NotFoundException('User not found');

    if (userToDelete.role === Role.SUPER_ADMIN && userRole !== Role.SUPER_ADMIN) {
      throw new UnauthorizedException('You do not have permission to delete this user');
    }

    await this.mediaService.removeCurrentEntityMedia({
      entityId: id,
      entityType: EntityType.USER,
      mediaPurpose: MediaPurpose.AVATAR,
    });

    const response = await this.prisma.user.delete({
      where: { id },
    });

    return response;
  }



  async sendResetEmail(email: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const token = crypto.randomBytes(32).toString("hex");
    const hash = crypto.createHash("sha256").update(token).digest("hex");

    await this.emailService.sendResetPasswordEmail({
      recipient: email,
      token:token,
    });
    return token;

  }


}