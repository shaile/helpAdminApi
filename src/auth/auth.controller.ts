import { Body, Get, Headers } from '@nestjs/common';
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { CreateUsersModel } from 'src/users/user.model';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/users')
  async create(@Body() createUsersModels: CreateUsersModel): Promise<string> {
   return await this.authService.create(createUsersModels);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/verify')
  async verify(@Headers() headers: any): Promise<any | PromiseLike<any>> {
    return await this.authService.verify(headers);
  }
}