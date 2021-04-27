import { CreateUsersModel, UpdateUsersModels, UserDetail, UsersListModel } from './user.model';
import { UserRepository } from './users.repository';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(createUsersModels: CreateUsersModel): Promise<any>;
    searchUsers(searchText: string): Promise<UsersListModel[]>;
    findOne(email: string): Promise<UserDetail | undefined>;
    getCurrentUser(email: string): Promise<UserDetail | undefined>;
    uploadPhoto(uploadPhoto: any, email: string): Promise<any>;
    update(update: UpdateUsersModels, email: string): Promise<void>;
}
