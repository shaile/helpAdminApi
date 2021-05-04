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

  /**
   * 
   * @returns 
   */
  async findAll(searchText: string): Promise<Assignment[]>{
    const queryObj = {};
    const options = { password: 0}
    if (searchText) {
        queryObj[`$or`] = [
          { topic: { $regex: '.*' + searchText + '.*', $options: 'i' } },
          { subject: { $regex: '.*' + searchText + '.*', $options: 'i' } }
        ];
      }
    return await this.assignmentModel.aggregate([{
      $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'fromItems'
      }
  }, {
      $replaceRoot: {
          newRoot: {
              $mergeObjects: [{
                  $arrayElemAt: ["$fromItems", 0]
              }, "$$ROOT"]
          }
      }
  }, {
      $project: {
          fromItems: 0,
          _id: 0,
          email: 0,
          password: 0,
          avatar: 0,
          address: 0,
          updatedOn: 0,
          createdOn: 0,
          phone: 0
      }
  }])
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async findOne(id: String): Promise<any>{
    return await this.assignmentModel.findById({ _id: id });
  }

  /**
   * 
   * @param userId 
   * @returns 
   */
  async findOneByUser(userId: String): Promise<any>{
    return await this.assignmentModel.find({userId}, {}, { sort: { topic: 1 }});
  }
}
