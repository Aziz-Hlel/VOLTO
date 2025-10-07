import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { UserMapper } from 'src/users/Mapper/usersMapper';
import { AuthUser } from 'src/users/Dto/AuthUser';
import { UserResponseDto } from 'src/users/Dto/userResponse';
import ENV from 'src/config/env';
import { EntityType, MediaPurpose, User } from '@prisma/client';
import { CreateCustomerDto } from 'src/users/Dto/create-customer';
import { UpdateUserDto } from 'src/users/Dto/update-user';
import { MediaService } from 'src/media/media.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mediaService: MediaService,
  ) {}

  static jwtExpirationTime = ['production', 'stage'].includes(ENV.NODE_ENV) ? '15m' : '1d';

  static refreshExpirationTime = ['production', 'stage'].includes(ENV.NODE_ENV) ? '7d' : '30d';

  async registerCustomer(dto: CreateCustomerDto) {
    const user = await this.usersService.registerCustomer(dto);

    const { accessToken, refreshToken } = this.getTokens(user);

    const user2 = {
      ...user,
      avatar: user.avatar ?? undefined,
    };

    const userDto = UserMapper.toResponse(user2);

    return { accessToken, refreshToken, user: userDto };
  }

  async login(email: string, password: string) {
    const validatedUser = await this.validateUser(email, password);

    const { accessToken, refreshToken } = this.getTokens(validatedUser);

    const userDto = UserMapper.toResponse({
      ...validatedUser,
      avatar: validatedUser.avatar ?? undefined,
    });

    return { accessToken, refreshToken, user: userDto };
  }

  async refresh(refreshToken: string) {
    try {
      const payload: { sub: string } = await this.jwtService.verify(refreshToken, {
        secret: ENV.JWT_REFRESH_SECRET,
      });

      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new UnauthorizedException('User not found');
      const tokens = this.getTokens(user);

      return tokens;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    const avatar = await this.mediaService.getMediaKeyAndUrlNoException({
      entityType: EntityType.USER,
      entityId: user.id,
      mediaPurpose: MediaPurpose.AVATAR,
    });

    const userWithAvatar = { ...user, avatar };

    return userWithAvatar;
  }

  public getTokens(user: User) {
    const payload = UserMapper.toTokenPayload(user);

    const accessToken = this.jwtService.sign(payload, {
      secret: ENV.JWT_ACCESS_SECRET,
      expiresIn: AuthService.jwtExpirationTime,
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: ENV.JWT_REFRESH_SECRET,
      expiresIn: AuthService.refreshExpirationTime,
    });
    return { accessToken, refreshToken };
  }

  async me(user: AuthUser): Promise<UserResponseDto> {
    const foundUser = await this.usersService.findById(user.id);
    if (!foundUser) throw new UnauthorizedException('User not found');

    const avatar = await this.mediaService.getMediaKeyAndUrlNoException({
      entityType: EntityType.USER,
      entityId: user.id,
      mediaPurpose: MediaPurpose.AVATAR,
    });

    const userDto = UserMapper.toResponse({
      ...foundUser,
      avatar: avatar ?? undefined,
    });

    return userDto;
  }

  async deleteAccount(userId: string) {
    return await this.usersService.deleteUser(userId);
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    return await this.usersService.updateUser(userId, updateUserDto);
  }
}
