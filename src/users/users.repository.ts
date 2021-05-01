import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUsersModel, UpdateUsersModels, UploadPhoto } from './user.model';

@Injectable()
export class UserRepository { 

  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  /**
   * Creates users
   * @param createUsersModel 
   * @returns users 
   */
  async createUsers(createUsersModel: CreateUsersModel): Promise<any> {
    const { email } = await this.userModel.findOneAndUpdate(
        {email: createUsersModel.email},
        { $set: {
            name: createUsersModel.name, 
            address: createUsersModel.address,
            phone: createUsersModel.phone,
            password: createUsersModel.password
        } },
        { upsert: true, new: true }
    );
    return { email };
  }


/**
 * Updates user repository
 * @param createUsersModel 
 * @returns update 
 */
async update(update: UpdateUsersModels, email: string): Promise<any> {
    return await this.userModel.updateOne(
        { email },
        { $set: {
            name: update.name, 
            address: update.address,
            phone: update.phone,
        } },
        { upsert: false }
    );
  }
 
  /**
   * Searchs users
   * @param searchText 
   * @returns users 
   */
  async searchUsers(searchText: string): Promise<User[]> {   
    const queryObj = {};
    const options = { password: 0}
    if (searchText) {
        queryObj[`$or`] = [
          { name: { $regex: '.*' + searchText + '.*', $options: 'i' } },
          { email: { $regex: '.*' + searchText + '.*', $options: 'i' } }
        ];
      }
    return await this.userModel.find(queryObj, options);
 }
/**
 * Finds one
 * @param email 
 * @returns one 
 */
async findOne(email: string): Promise<User> {
   return await this.userModel.findOne({email}, (err: any, adventure: any) =>{
     if(err) {
       console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^', err);
     }else{
       console.log('***************sss', adventure)
     }
   }).exec();
 }
/**
 * Gets current user
 * @param email 
 * @returns current user 
 */
async getCurrentUser(email: string): Promise<User> {
   return await this.userModel.findOne({email}, {password: 0})
 }

 async uploadPhoto(uploadPhoto: UploadPhoto, email: string): Promise<any> {
  const data = await this.userModel.findOneAndUpdate(
    {email},
    { $set: {
      avatar: uploadPhoto
    }},
    { upsert: false, new: true }
  );
 
    return {profilePic: data.avatar.filename, updatedOn: data.updatedOn}
 }

}
