import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private dataSource: DataSource) {}

  async create(createAccountDto: CreateAccountDto) {
    const accountRepo = await this.dataSource.getRepository(Account);
    const account = new Account();
    account.accountNumber = createAccountDto.accountNumber;
    account.balance = createAccountDto.balance;
    accountRepo.save(account);
  }

  async findAll() {
    const AccountRepo = this.dataSource.getRepository(Account);
    const account = AccountRepo.find();
    return account;
  }

  async findOne(id: number) {
    const AccountRepo = this.dataSource.getRepository(Account);
    const account = AccountRepo.find({ where: { id: id } });
    return account;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    const accountRepo = this.dataSource.getRepository(Account);
    if (!(await accountRepo.findOneBy({ id: id }))) {
      throw new BadRequestException('Nincs ilyen fiók!');
    }
    const accountToUpdate = await accountRepo.findOneBy({ id });
    if (updateAccountDto.accountNumber == null) {
      throw new BadRequestException('Error');
    }
    accountToUpdate.accountNumber = updateAccountDto.accountNumber;
    accountToUpdate.balance = updateAccountDto.balance;

    accountRepo.save(accountToUpdate);
  }

  async remove(id: number) {
    const accountRepo = await this.dataSource.getRepository(Account);
    accountRepo.delete(id);
  }
}
