import { CreateUsersModel } from 'src/users/user.model';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    create(createUsersModels: CreateUsersModel): Promise<void>;
    verify(headers: any): Promise<any | PromiseLike<any>>;
}
