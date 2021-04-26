export class CreateUsersModel{
    // eslint-disable-next-line @typescript-eslint/ban-types
    address?: any;
    avatar?: any;
    email: string;
    name: string;
    phone: string;
    password?: string;

}
export class UpdateUsersModels{
    // eslint-disable-next-line @typescript-eslint/ban-types
    address?: any;
    name: string;
    phone: string;
}



export class UsersListModel{
    _id: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    address: Object;
    avatar: any;
    email: string;
    name: string;
    phone: string;
    createdOn: Date;
    updatedOn: Date; 
}

export class UserDetail{
    _id: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    address: Object;
    avatar: any;
    email: string;
    name: string;
    phone: string;
    password: string
    createdOn: Date;
    updatedOn: Date; 
}

export class UploadPhoto{
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}