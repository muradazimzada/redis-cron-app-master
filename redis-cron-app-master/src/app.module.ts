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
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suit } from './suit/suit.entity';
import { SuitRepository } from './suit/suit.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    SuitModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: '127.0.0.1',
      port: 27017,
      database: 'kalee',
      entities: [Suit],
      synchronize: true,
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
  controllers: [AppController, SuitController],
  providers: [AppService, SuitService, RedisService, SuitRepository],
  exports: [SuitModule],
})
export class AppModule {}
