import { Body, Controller, Get, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { editFileName } from 'src/common/file.validation';
import { CreateAssignmentDto } from './assignment.model';
import { AssignmentService } from './assignment.service';

@Controller('api')
export class AssignmentController {
    constructor(
        private readonly assignmentService: AssignmentService ) {}

        /**
         * 
         * @param files 
         * @param createAssignmentDto 
         * @returns 
         */
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

        /**
         * @returns 
         */
        @UseGuards(JwtAuthGuard)
        @Get('/assignment')
        async findAll(@Query('searchText') query: string): Promise<any[]>{
          return this.assignmentService.findAll(query);
        }

        /**
         * @param params 
         * @returns 
         */
        @UseGuards(JwtAuthGuard)
        @Get('/assignment/:id')
        async findOne(@Param() params): Promise<string>{
          return this.assignmentService.findOne(params.id);
        }

        /**
         * 
         * @param params 
         * @returns 
         */
        @UseGuards(JwtAuthGuard)
        @Get('/userorder/:userId')
        async findOneByUser(@Param() params): Promise<string>{
          return this.assignmentService.findOneByUser(params.userId);
        }
}

