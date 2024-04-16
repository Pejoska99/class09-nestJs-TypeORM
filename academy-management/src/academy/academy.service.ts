import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAcademyDto } from './dto/create-academy.dto';
import { UpdateAcademyDto } from './dto/update-academy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Academy } from './entities/academy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AcademyService {
   constructor 
   ( @InjectRepository(Academy)
  private academyRepository: Repository<Academy>) {}

  async findAll(): Promise<Academy[]> {
    return this.academyRepository.find();
  }

  async findOne(id: number): Promise<Academy> {
   try {
    return this.academyRepository.findOneByOrFail({id});
    
   } catch (error) {
    if(error.name === 'EntityNotFoundError') {
      throw new NotFoundException(`Academy whit ID ${id} not found`)
    }
    throw error
   }
  }


  async create(createAcademyDto: CreateAcademyDto): Promise<Academy> {
    const academy =  this.academyRepository.create(createAcademyDto);
    await this.academyRepository.save(academy);
    return academy
  }

  async update(id: number, updateAcademyDto: UpdateAcademyDto):Promise<Academy> {
    let academy = await this.academyRepository.findOneBy({id});
    academy = this.academyRepository.merge(academy, updateAcademyDto);
    await this.academyRepository.save(academy)
    return academy
  }

  async remove(id: number): Promise<void> {
    await this.academyRepository.delete(id);
  }
}

