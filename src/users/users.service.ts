import { Injectable } from '@nestjs/common';
import {
  CreateUsersModel,
  UpdateUsersModels,
  UserDetail,
  UsersListModel,
} from './user.model';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Creates users
   * @param createUsersModels
   */
  async create(createUsersModels: CreateUsersModel) {
    return await this.userRepository.createUsers(createUsersModels);
  }

  /**
   * Searchs users
   * @param searchText
   * @returns users
   */
  async searchUsers(searchText: string, pageNo?: number, limit?: number, sortBy?: string, sortOrder?: string): Promise<UsersListModel[]> {
    return await this.userRepository.searchUsers(searchText, pageNo, limit, sortBy, sortOrder);
  }

  /**
   * Finds one
   * @param email
   * @returns one
   */
  async findOne(email: string): Promise<UserDetail | undefined> {
    return this.userRepository.findOne(email);
  }
  async findById(id: string): Promise<UserDetail | undefined> {
    return this.userRepository.findById(id);
  }
  /**
   * Gets current user
   * @param email
   * @returns current user
   */
  async getCurrentUser(email: string): Promise<UserDetail | undefined> {
    return await this.userRepository.getCurrentUser(email);
  }

  /**
   * Uploads photo
   * @param uploadPhoto
   * @param email
   * @returns photo
   */
  async uploadPhoto(uploadPhoto: any, email: string): Promise<any> {
    return await this.userRepository.uploadPhoto(uploadPhoto, email);
  }

  /**
   * Updates users service
   * @param update
   * @returns update
   */
  async update(update: UpdateUsersModels, email: string): Promise<void> {
    await this.userRepository.update(update, email);
  }
}
