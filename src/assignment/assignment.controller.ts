import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/common/file.validation';
import { CreateAssignmentDto, CreateAssignmentModel } from './assignment.model';
import { AssignmentService } from './assignment.service';

@Controller('api')
export class AssignmentController {
    constructor(
        private readonly assignmentService: AssignmentService ) {}

        @Post('/assignment')        
        @UseInterceptors(FileFieldsInterceptor([
            { name: 'document_1', maxCount: 1 },
            { name: 'document_2', maxCount: 1 },
            { name: 'document_3', maxCount: 1 },
            { name: 'document_4', maxCount: 1 }
          ], {
          storage: diskStorage({
            destination: './uploads/documents'
            , filename: editFileName,
          })
        }))        
        async create( @UploadedFiles() files, @Body() createAssignmentDto: CreateAssignmentDto) { 
            let newFileData = {};
            newFileData = {...newFileData, ...files, ...createAssignmentDto};
            console.log('@@@@@@@@@@@@@@@@',  newFileData);
           
          return await this.assignmentService.create({...files, ...createAssignmentDto});
        }
}

