import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { SuitDto } from './suit.dto';
import { Cache } from 'cache-manager';
@Injectable()
export class SuitService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  public async get(id: string): Promise<SuitDto> {
    //console.log(this.cacheManager.get(id), ':log');
    return this.cacheManager.get(id);
  }

  public async add(SuitDto: SuitDto) {
    await this.cacheManager.set(SuitDto.id, SuitDto, 200_000);
    return this.cacheManager.get(SuitDto.id);
  }

  public async getAllKeys() {
    return await this.cacheManager.store.keys();
  }
}
