import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AssignmentModule } from './assignment/assignment.module';
const PROD_ENV = 'production';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*'],
    }),
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === PROD_ENV
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:'mongodb+srv://helpMyAassignment:SU6d4DB8cFDKwdRP@cluster0.yvdwk.mongodb.net/usermanegement?retryWrites=true&w=majority'
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    ProductModule,
    AssignmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
