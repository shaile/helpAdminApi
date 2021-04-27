import { JwtService } from '@nestjs/jwt';
import { CreateUsersModel } from 'src/users/user.model';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    create(registrationData: CreateUsersModel): Promise<any>;
    verify(headers: any): Promise<import("../users/user.model").UserDetail>;
}
