import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { HttpStatusCode } from "axios";
import { ConfirmPasswordRequestDto } from "./Dto/confirm-password-request.dto";
import { ConfirmPasswordResponseDto } from "./Dto/confirm-password-response.dto";



@Controller('/reset-password')
export class PasswordResetController {
  constructor(private usersService: UsersService,) {}

  @HttpCode(HttpStatusCode.Ok)
  @Post('request')
  async request(@Body('email') email: string) {

    if(!email || typeof email !== 'string') throw new BadRequestException('Email is required');
    const response = await this.usersService.sendResetEmail(email);

    return response
  }


  @HttpCode(HttpStatusCode.Ok)
  @Post('confirm')
  async confirm(@Body() body: ConfirmPasswordRequestDto): Promise<ConfirmPasswordResponseDto> {
    
    const response = await this.usersService.confirmResetPassword(body);

    return response
  
  }





}