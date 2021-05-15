import { Injectable, Logger, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, PaginateResult } from 'mongoose';
import { Assignment } from './assignment.interface';
import { CreateAssignmentModel } from './assignment.model';

@Injectable()
export class AssignmentRepository { 
  defaultLimit = 5;
  defaultPageNo = 1;
  defaultOffset = 0;
  constructor(
    @InjectModel('Assignment')
    private assignmentModel: PaginateModel<Assignment>,
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
  async findAll(searchText: string, pageNo?: number, limit?: number, sortBy?: string, sortOrder?: any, userId?: string): Promise<PaginateResult<Assignment>>{
    const queryObj = {};
    if(userId){
      queryObj['userId'] = userId;
    }

    let sort = {};
    sortOrder = sortOrder === 'ASC' ? 1 : -1;
    if (sortBy && sortOrder) {
      sort[sortBy] = sortOrder;
    } else {
      sort = {createdOn: -1,  name: -1,  };
    }
    const options = {
      page: pageNo ? pageNo : this.defaultPageNo,
      limit: limit ? limit : this.defaultLimit,
      sort
    };
    if (searchText) {
        queryObj[`$or`] = [
          { topic: { $regex: '.*' + searchText + '.*', $options: 'i' } },
          { subject: { $regex: '.*' + searchText + '.*', $options: 'i' } }
        ];
      }

      
    return await this.assignmentModel.paginate(queryObj, options);
  }
// aggregate([
//        {
//           $facet:{
//             docs:[{
//               $lookup: {
//                   from: 'users',
//                   localField: 'userId',
//                   foreignField: '_id',
//                   as: 'fromItems'
//               }
//           }, {
//               $replaceRoot: {
//                   newRoot: {
//                       $mergeObjects: [{
//                           $arrayElemAt: ["$fromItems", 0]
//                       }, "$$ROOT"]
//                   }
//               }
//           }, {
//               $project: {
//                   fromItems: 0,
//                   _id: 0,
//                   email: 0,
//                   password: 0,
//                   avatar: 0,
//                   address: 0,
//                   updatedOn: 0,
//                   createdOn: 0,
//                   phone: 0
//               },
//           }],
//           paging: [
//             { 
//               $count: 'totalDocs' 
//             }
//           ]
//           }
//        },{
//         $skip: 0
//        }
//     ])
  /**
   * 
   * @param id 
   * @returns 
   */
  async findOne(id: string): Promise<any>{
    return await this.assignmentModel.findById({ _id: id });
  }

  /**
   * 
   * @param userId 
   * @returns 
   */
  async findOneByUser(userId: string): Promise<any>{
    return await this.assignmentModel.find({userId}, {}, { sort: { topic: 1 }});
  }
}
