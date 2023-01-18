import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Suit } from './suit.entity';

@Injectable()
export class SuitRepository {
  constructor(
    @InjectRepository(Suit)
    private suitRepository: Repository<Suit>,
  ) {}

 async findAll(): Promise<Suit[]> {
    return await this.suitRepository.find();
  }

 async findOne(_id: ObjectID): Promise<Suit> {
    return this.suitRepository.findOneBy({ _id });
  }
 async add (suit: Suit) : Promise<Suit> {
    await this.suitRepository.insert(suit);
     return this.findOne(suit._id);
  }
//   async remove(id: string): Promise<void> {
//     await this.usersRepository.delete(id);
//   }
} 