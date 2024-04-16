import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcademyModule } from './academy/academy.module';
import { SubjectModule } from './subject/subject.module';
import { DatabaseModule } from './database/database.module';


import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    
    AcademyModule, SubjectModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
