import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { first } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';
import { ObjectID } from 'typeorm';
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
    @Inject('Notification_Service') private readonly client: ClientProxy,
  ) {}
  //#region  cache-read-write
  @Post('addSuit')
  async addSuit(@Body() suit: Suit) {
    await this.suitService.add(suit);
    return this.suitService.get(suit._id.toString());
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
    const suits = await this.getAll();
    const currentDate = new Date();

    const currentTime = new Time(
      currentDate.getHours(),
      currentDate.getMinutes(),
    );
      //console.log(suits);
    suits.forEach((suit) => {
      const meetingTime = new Date(suit.meeting_times.first);
      //s meetingTime.getHours();
       console.log(meetingTime.getUTCHours());
       const timeLeftToMeeting = meetingTime.getUTCHours() -currentDate.getHours();;
       const remainderTime = (suit.meetingRemainderHours.first);
      //  console.log('suit.meeting_times.first:',suit.meeting_times.first);
      //  console.log('suit.meetingRemainderHours.first:',suit.meetingRemainderHours.first);
      //  console.log('timeLeftToMeeting', timeLeftToMeeting);
      //  console.log('remainderTime.getHours():', remainderTime);
       console.log(remainderTime == timeLeftToMeeting);
      if (timeLeftToMeeting == remainderTime) 
      {
           console.log("suit sent to queue")
           this.client.emit('sendNotification', suit);
      }
      console.log('you should notify user');
    });
  }
  //#endregion

  // #db operations
  @Post('dbPost')
  async addToDb(@Body() suit: Suit): Promise<Suit> {
    console.log('dbPost called');
    const data = await this.suitRepository.add(suit);
    console.log(data);
    return data;
  }
  @Get('getById/:id')
  async getByIdFromDb(@Param('id') _id: ObjectID) {
    const data = await this.suitRepository.findOne(_id);
    return data;
  }

  @Get('getAll')
  async getAll() {
    const data = await this.suitRepository.findAll();
    console.log(data);
    return data;
  }
}
