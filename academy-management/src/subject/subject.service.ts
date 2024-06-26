import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}
 

  async findAll(): Promise<Subject[]> {
    return this.subjectRepository.find()
  }

  async findOne(id: number): Promise<Subject> {
    try {
      return this.subjectRepository.findOneByOrFail({id});
      
    } catch (error) {
      if(error.name === 'EntityNotFoundError'){
        throw new NotFoundException(`Subject with ID ${id} not found`)
      }
      
    }
  }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    const subject = this.subjectRepository.create(createSubjectDto)
    await this.subjectRepository.save(subject);
    return subject
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    let subject = await this.subjectRepository.findOneBy({id});
    subject = this.subjectRepository.merge(subject, updateSubjectDto)
    await this.subjectRepository.save(subject);
    return subject
  }

  async remove(id: number):Promise<void>{
    await this.subjectRepository.delete(id)
  }
}
