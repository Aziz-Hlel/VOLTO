import { IsString, MinLength } from "class-validator";


export class ConfirmPasswordRequestDto {

    @IsString()
    token: string;

    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    newPassword: string;


}