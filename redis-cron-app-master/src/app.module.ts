import { CACHE_MANAGER, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuitController } from './suit/suit.controller';
import { SuitService } from './suit/suit.service';
import { SuitModule } from './suit/suit.module';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { CacheModule } from '@nestjs/common/cache';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [SuitModule],
  controllers: [AppController, SuitController],
  providers: [AppService, SuitService, RedisService],
  exports: [SuitModule],
})
export class AppModule {}
