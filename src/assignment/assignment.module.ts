import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { AssignmentController } from './assignment.controller';
import { AssignmentRepository } from './assignment.repository';
import { AssignmentSchema } from './assignment.schema';
import { AssignmentService } from './assignment.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: 'Assignment', schema: AssignmentSchema },
    ]),
    UsersModule
  ],
  controllers: [AssignmentController],
  providers: [AssignmentService, AssignmentRepository]
})
export class AssignmentModule {}
