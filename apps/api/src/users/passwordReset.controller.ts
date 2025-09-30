import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";



@Controller('/reset-password')
export class PasswordResetController {
  constructor(private usersService: UsersService) {}

  @Post('request')
  async request(@Body('email') email: string) {
    return this.usersService.sendResetEmail(email);
  }

  @Post('confirm')
  async confirm(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.passwordResetService.resetPassword(token, newPassword);
  }
}