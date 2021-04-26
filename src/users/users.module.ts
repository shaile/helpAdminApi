import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersController } from './users.controller';
import { UserRepository } from './users.repository';
import { UserSchema } from './users.schema';
import { UsersService } from './users.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService]

})
export class UsersModule {}
