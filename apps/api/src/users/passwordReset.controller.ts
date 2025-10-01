import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { HttpStatusCode } from "axios";



@Controller('/reset-password')
export class PasswordResetController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatusCode.Ok)
  @Post('request')
  async request(@Body('email') email: string) {

    if(!email || typeof email !== 'string') throw new BadRequestException('Email is required');
    return this.usersService.sendResetEmail(email);
  }

  @Post('confirm')
  async confirm(
    @Body('token') token: string, 
    @Body('newPassword') newPassword: string,
  ) {
    // return this.passwordResetService.resetPassword(token, newPassword);
  }
}