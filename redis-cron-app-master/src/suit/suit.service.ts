import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Suit } from './suit.entity';
@Injectable()
export class SuitService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async get(id: string): Promise<Suit> {
    //console.log(this.cacheManager.get(id), ':log');
    return this.cacheManager.get(id);
  }

  public async add(SuitDto: Suit) {
    await this.cacheManager.set(SuitDto._id.toString(), SuitDto, 200_000);
    return this.cacheManager.get(SuitDto._id.toString());
  }

  public async getAllKeys() {
    return await this.cacheManager.store.keys();
  }
}
