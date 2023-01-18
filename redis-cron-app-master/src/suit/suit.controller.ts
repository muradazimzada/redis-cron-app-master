import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { first } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';
import { SuitDto } from './suit.dto';
import { Suit } from './suit.entity';
import { SuitRepository } from './suit.repository';
import { SuitService } from './suit.service';
class Time {
  constructor(hour: number, minute: number) {
    this.hour = hour;
    this.minute = minute;
  }
  hour: number;
  minute: number;
}
@Controller('suit')
export class SuitController {
  constructor(
    private readonly suitService: SuitService,
    private readonly suitRepository: SuitRepository,
    @Inject('News_Service') private readonly client: ClientProxy,
  ) {}
  //#region  cache-read-write
  @Post('addSuit')
  async addSuit(@Body() suit: SuitDto) {
    await this.suitService.add(suit);
    //console.log(suit);
    return this.suitService.get(suit.id);
  }

  @Get('getAllSuitKeys')
  getKeys() {
    return this.suitService.getAllKeys();
  }

  @Get('getSuit/:id')
  async getSuit(@Param('id') id: string) {
    //console.log(id);
    return await this.suitService.get(id.toString());
  }
  //#endregion

  //#region  CronTask
  @Cron('10 * * * * *')
  async checkIfRemainderNeeded() {
    /* 
   get from db and send rabbitmq
  */
    const suit = await this.suitService.get('4');
    const currentDate = new Date();

    const currentTime = new Time(
      currentDate.getHours(),
      currentDate.getMinutes(),
    );
    console.log(suit);
    const timeLeftToMeeting =
      currentTime.hour - new Date(suit.meeting_times.first).getHours();
    // console.log(suit.meetingRemainderHours.first);
    if (timeLeftToMeeting == suit.meetingRemainderHours.first) {
      this.client.emit('sendNotification', suit);
      console.log('you should notify user');
    } else if (timeLeftToMeeting < 0) {
      console.log('you missed the meeting');
    }
}
  //#endregion

  // db write
  @Post('dbPost')
  async addToDb(@Body() suit: Suit): Promise<Suit> {
    console.log('dbPost called');
    const data = await this.suitRepository.add(suit);
    console.log(data);
    return data;
  }
}
