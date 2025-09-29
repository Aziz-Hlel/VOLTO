import { Gender, Role, Tier } from "@prisma/client";
import { Type } from "class-transformer";
import { IsEmail, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateObjectWithMediaRequestDto } from "src/media/dto/MediaRequest.dto";


export class StaffRequestDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsString()
    confirmPassowrd?: string;
    
    @IsEnum(Role, { message: 'Invalid Role' })
    role: Role;

    @IsOptional()
    @IsString()
    phoneNumber?: string;
    
    @IsEnum(Gender, { message: 'Gender must be either M or F' })
    gender: Gender;

    @IsEnum(Tier, { message: 'Invalid Tier' })
    tier: Tier = Tier.SILVER;


    @ValidateNested()
    @Type(() => CreateObjectWithMediaRequestDto)
    avatar?: CreateObjectWithMediaRequestDto;

}