import { Body, Controller, Get, Headers, Param, Post, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/role/roles.guard';
import { editFileName } from '../common/file.validation';
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
          return await this.assignmentService.create({...files, ...createAssignmentDto});
        }

        /**
         * 
         * @param searchText 
         * @param pageNo 
         * @param limit 
         * @param sortBy 
         * @param sortOrder 
         * @returns 
         */
        @UseGuards(RolesGuard)
        @UseGuards(JwtAuthGuard)
        @Get('/assignment')
        async findAll(
          @Query('searchText') searchText: string,
          @Query('page') pageNo: number,
          @Query('limit') limit: number,
          @Query('sortBy') sortBy: string,
          @Query('sortOrder') sortOrder: string): Promise<any[]>{
          return this.assignmentService.findAll(searchText, pageNo, limit, sortBy, sortOrder);
        }

        
        @UseGuards(JwtAuthGuard)
        @Get('/myorders')
        async findMyAll(
          @Query('searchText') searchText: string,
          @Query('page') pageNo: number,
          @Query('limit') limit: number,
          @Query('sortBy') sortBy: string,
          @Query('sortOrder') sortOrder: string,
          @Headers() headers: any): Promise<any[]>{
          return this.assignmentService.findAll(searchText, pageNo, limit, sortBy, sortOrder, headers);
        }

        /**
         * @param params 
         * @returns 
         */
        // @UseGuards(RolesGuard)
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
        @UseGuards(RolesGuard)
        @UseGuards(JwtAuthGuard)
        @Get('/userorder/:userId')
        async findOneByUser(@Param() params): Promise<string>{
          return this.assignmentService.findOneByUser(params.userId);
        }
}

