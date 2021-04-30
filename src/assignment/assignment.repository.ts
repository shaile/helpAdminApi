import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment } from './assignment.interface';
import { CreateAssignmentModel } from './assignment.model';

@Injectable()
export class AssignmentRepository { 

  constructor(
    @InjectModel('Assignment')
    private assignmentModel: Model<Assignment>,
  ) {}

  /**
   * 
   * @param createAssignmentModel 
   * @returns 
   */
  async create(createAssignmentModel: CreateAssignmentModel): Promise<any> {    
    return await this.assignmentModel.create(createAssignmentModel)
  }

}
