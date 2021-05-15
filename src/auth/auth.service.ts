import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUsersModel } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const match = await bcrypt.compare(pass, user.password);
    if (user && match) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user._doc.email,
      sub: user._doc._id,
      name: user._doc.name,
      role: user._doc.role
    };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }

  async create(registrationData: CreateUsersModel) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    try {
      const createdUser: any = await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      console.log('***********', createdUser);
      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'Something went wrong',
      });
    }
  }
/**
 * Verifys auth service
 * @param headers 
 * @returns  
 */
async verify(headers: any) {
  console.log('555555555555555555', headers)
    try {
      const { authorization } = headers;
      const parts = authorization.split(' ');
      if (parts.length === 2) {
        const scheme = parts[0];
        const token = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          this.jwtService.verify(token);
          const decode: any = this.jwtService.decode(token);
          return this.usersService.getCurrentUser(decode.email);
        }
      }
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
