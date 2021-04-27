import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUsersModel, UpdateUsersModels, UploadPhoto } from './user.model';
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<User>);
    createUsers(createUsersModel: CreateUsersModel): Promise<any>;
    update(update: UpdateUsersModels, email: string): Promise<any>;
    searchUsers(searchText: string): Promise<User[]>;
    findOne(email: string): Promise<User>;
    getCurrentUser(email: string): Promise<User>;
    uploadPhoto(uploadPhoto: UploadPhoto, email: string): Promise<any>;
}
