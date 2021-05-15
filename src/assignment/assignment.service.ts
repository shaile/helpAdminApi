import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAssignmentDto, CreateAssignmentModel } from './assignment.model';
import { AssignmentRepository } from './assignment.repository';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AssignmentService {
  constructor(
    private readonly usersService: UsersService,
    private readonly assignmentRepository: AssignmentRepository,
    private readonly authService: AuthService
  ) {}

  /**
   *
   * @param createAssignmentModel
   * @returns
   */
  async create(createAssignmentDto: CreateAssignmentDto): Promise<any> {
    const { _id: userId } = await this.usersService.findOne(
      createAssignmentDto.email,
    );
    delete createAssignmentDto.email;
    const createAssignmentModel: CreateAssignmentModel = {
      ...createAssignmentDto,
      userId,
    };
    return await this.assignmentRepository.create(createAssignmentModel);
  }

  async findAll(searchText: string, pageNo?: number, limit?: number, sortBy?: string, sortOrder?: string, headers?: any): Promise<any> {
    let userId = '';
    if(headers){
      const  { _id } = await this.authService.verify(headers);
      userId = _id;
    }
    return await this.assignmentRepository.findAll(searchText, pageNo, limit, sortBy, sortOrder, userId);
  }

  async findOne(id: string): Promise<any> {
    return await this.assignmentRepository.findOne(id);
  }

  async findOneByUser(userId: string): Promise<any>{
    return await this.assignmentRepository.findOneByUser(userId);
  }
}
