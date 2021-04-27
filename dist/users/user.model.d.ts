export declare class CreateUsersModel {
    address?: any;
    avatar?: any;
    email: string;
    name: string;
    phone: string;
    password?: string;
}
export declare class UpdateUsersModels {
    address?: any;
    name: string;
    phone: string;
}
export declare class UsersListModel {
    _id: string;
    address: Object;
    avatar: any;
    email: string;
    name: string;
    phone: string;
    createdOn: Date;
    updatedOn: Date;
}
export declare class UserDetail {
    _id: string;
    address: Object;
    avatar: any;
    email: string;
    name: string;
    phone: string;
    password: string;
    createdOn: Date;
    updatedOn: Date;
}
export declare class UploadPhoto {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}
