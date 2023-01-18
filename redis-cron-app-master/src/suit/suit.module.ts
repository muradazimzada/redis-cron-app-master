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
import * as redisStore from 'cache-manager-redis-store';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suit } from './suit.entity';
import { SuitService } from './suit.service';
import { SuitRepository } from './suit.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Suit]),
    CacheModule.register({
      useFactory: () => {
        return {
          store: redisStore,
          host: 'localhost',
          port: 6379,
          ttl: 200_000,
          //ttl: 60 * 3600 * 1000,
        };
      },
    }),
    ClientsModule.register([
      {
        name: 'Notification_Service',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'suits_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [SuitController],
  providers: [SuitService, SuitRepository],
  exports: [CacheModule, TypeOrmModule],
})
export class SuitModule {}
