import { Document } from 'mongoose';
interface IPaginator {
    paginate(): void;
}
export interface User extends Document, IPaginator {
    readonly _id: string;
    readonly address: string;
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly avatar: any;
    readonly password: string;
    readonly createdBy: string;
    readonly createdOn: Date;
    readonly updatedBy: string;
    readonly updatedOn: Date;
}
export {};
