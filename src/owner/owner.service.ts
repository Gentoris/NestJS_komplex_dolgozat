import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(private dataSource: DataSource) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const ownerRepo = await this.dataSource.getRepository(Owner);
    const owner = new Owner();
    owner.fullName = createOwnerDto.fullName;
    owner.business = createOwnerDto.business;
    ownerRepo.save(owner);
  }

  async findAll() {
    const OwnerRepo = this.dataSource.getRepository(Owner);
    const owner = OwnerRepo.find();
    return owner;
  }

  async findOne(id: number) {
    const OwnerRepo = this.dataSource.getRepository(Owner);
    const owner = OwnerRepo.find({ where: { id: id } });
    return owner;
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto) {
    const ownerRepo = this.dataSource.getRepository(Owner);
    if (!(await ownerRepo.findOneBy({ id: id }))) {
      throw new BadRequestException('Nincs ilyen tulajdonos!');
    }
    const ownerToUpdate = await ownerRepo.findOneBy({ id });
    if (updateOwnerDto.fullName == null) {
      throw new BadRequestException('Error');
    }
    ownerToUpdate.fullName = updateOwnerDto.fullName;
    ownerToUpdate.business = updateOwnerDto.business;

    ownerRepo.save(ownerToUpdate);
  }

  async remove(id: number) {
    const ownerRepo = await this.dataSource.getRepository(Owner);
    ownerRepo.delete(id);
  }
}
