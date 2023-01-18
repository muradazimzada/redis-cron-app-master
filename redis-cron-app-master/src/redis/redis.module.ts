import { CacheModule, CACHE_MANAGER, Inject, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisService } from './redis.service';
import { Cache } from 'cache-manager';
import { OnModuleInit } from '@nestjs/common/interfaces';
@Module({
  imports: [
    // CacheModule.registerAsync({
    //   useFactory: () => {
    //     return {
    //       store: redisStore,
    //       host: 'localhost',
    //       port: 6379,
    //       ttl: 60 * 3600 * 1000,
    //     };
    //   },
    // }),
    CacheModule.register(),
  ],
  providers: [RedisService, CacheModule],
  exports: [CacheModule, RedisService],
})
export class RedisModule {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}
}
