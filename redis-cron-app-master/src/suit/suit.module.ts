import {
  CacheModule,
  CacheModuleOptions,
  Logger,
  Module,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { ScheduleModule } from '@nestjs/schedule';
import { SuitController } from './suit.controller';
import { SuitService } from './suit.service';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CacheModule.register({
      useFactory: () => {
        return {
          store: redisStore,
          host: 'localhost',
          port: 6379,
          ttl: 200_000 
          //ttl: 60 * 3600 * 1000,
        };
      },
    }),
  ],
  controllers: [SuitController],
  providers: [SuitService],
  exports: [CacheModule],
})
export class SuitModule {}
