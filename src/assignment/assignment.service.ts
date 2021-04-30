import { Injectable } from '@nestjs/common';
import { CreateAssignmentModel } from './assignment.model';
import { AssignmentRepository } from './assignment.repository';

@Injectable()
export class AssignmentService {
    constructor(private readonly assignmentRepository: AssignmentRepository) {}


    /**
     * 
     * @param createAssignmentModel 
     * @returns 
     */
    async create(createAssignmentModel: CreateAssignmentModel) {
        return await this.assignmentRepository.create(createAssignmentModel);
      }
}
