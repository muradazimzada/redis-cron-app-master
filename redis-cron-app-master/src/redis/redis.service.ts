import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';
import { SuitDto } from 'src/suit/suit.dto';
@Injectable()
export class RedisService {
  count = 0;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {} 

  public async get(key: string) {
    return await this.cacheManager.get<SuitDto>(key);
  } 

  public async add(SuitDto: SuitDto) {
    return await this.cacheManager.set((this.count++).toString(), JSON.stringify(SuitDto));
  } 
 
  public async getAllKeys() {   
    return await this.cacheManager.store.keys();  
  } 
}
