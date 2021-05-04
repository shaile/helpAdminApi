import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateAssignmentDto, CreateAssignmentModel } from './assignment.model';
import { AssignmentRepository } from './assignment.repository';

@Injectable()
export class AssignmentService {
  constructor(
    private readonly usersService: UsersService,
    private readonly assignmentRepository: AssignmentRepository,
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

  async findAll(searchText: string): Promise<any> {
    return await this.assignmentRepository.findAll(searchText);
  }

  async findOne(id: String): Promise<any> {
    return await this.assignmentRepository.findOne(id);
  }

  async findOneByUser(userId: String): Promise<any>{
    return await this.assignmentRepository.findOneByUser(userId);
  }
}
