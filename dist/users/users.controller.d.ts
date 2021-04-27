import { AuthService } from 'src/auth/auth.service';
import { UpdateUsersModels, UsersListModel } from './user.model';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UsersService, authService: AuthService);
    findAll(query: string): Promise<UsersListModel[]>;
    upload(file: any, headers: any): Promise<any>;
    update(updateUsersModels: UpdateUsersModels, headers: any): Promise<void>;
}
