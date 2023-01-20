import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices/decorators';
import { AppService } from './app.service';
import { Suit } from './suit/suit.entity';
//import { Suit } from './redis-cron-app-master/src/suit/suit.entity.ts'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('sendNotification')
  getNotifiedSuit(@Payload() suit) 
  {
    console.log(suit);
  }
} 
  