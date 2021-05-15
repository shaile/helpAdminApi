import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/role/roles.guard';
import { UpdateUsersModels, UsersListModel } from './user.model';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Gets users controller
   * @param query
   * @returns all
   */
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/users')
  async findAll(
    @Query('searchText') searchText: string,
    @Query('page') pageNo: number,
    @Query('limit') limit: number,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: string): Promise<UsersListModel[]> {
    return this.userService.searchUsers(searchText, pageNo, limit, sortBy, sortOrder);
  }

  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/users/:userId')
  async findById(@Param() params): Promise<any> {
    return this.userService.findById(params.userId);
  }

  /**
   * Posts users controller
   * @param file
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Post('/users/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profile',
        filename: (req, file, cb) => {
          const userId = req.user['userId'];
          // Generating a 32 random chars long string
          // const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `UserId-${userId}-Image-${Date.now()}.png`);
        },
      }),
    }),
  )
  async upload(@UploadedFile() file, @Headers() headers: any) {
    const context: any = await this.authService.verify(headers);
    return await this.userService.uploadPhoto(file, context.email);
  }

  @UseGuards(JwtAuthGuard)
  @Put('auth/users')
  async update(
    @Body() updateUsersModels: UpdateUsersModels,
    @Headers() headers: any,
  ): Promise<void> {
    const context: any = await this.authService.verify(headers);
    console.log(
      `update request payload body ${JSON.stringify(updateUsersModels)}`,
    );
    await this.userService.update(updateUsersModels, context.email);
  }
}
