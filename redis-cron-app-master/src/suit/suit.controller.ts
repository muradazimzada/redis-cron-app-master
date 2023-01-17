import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { first } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';
import { SuitDto } from './suit.dto';
import { SuitService } from './suit.service';
class Time {
  constructor( hour: number,
    minute: number) {
      this.hour=hour;
      this.minute=minute;
    }
  hour: number;
  minute: number; 
}
@Controller('suit')
export class SuitController {
  constructor(private readonly suitService: SuitService) {}
  @Post('addSuit')
  async addSuit(@Body() suit: SuitDto) {
    await this.suitService.add(suit);
    //console.log(suit);
    return this.suitService.get(suit.id);
  }

  @Get('getAllSuitKeys')
  getKeys() 
  {
    return this.suitService.getAllKeys();
  }

  @Get('getSuit/:id')
 async getSuit(@Param('id') id: string)
  {
    //console.log(id);
    return await this.suitService.get(id.toString());  
  }
  @Cron('10 * * * * *') 
  async checkIfRemainderNeeded() {

    const suit = await this.suitService.get("4");  
    const currentDate = new Date();  
    
    const currentTime = new Time(currentDate.getHours(), currentDate.getMinutes());
    console.log(suit);
    const timeLeftToMeeting = currentTime.hour - new Date(suit.meeting_times.first).getHours();
    // console.log(suit.meetingRemainderHours.first);
    if(timeLeftToMeeting== suit.meetingRemainderHours.first)
    {
      console.log("you should notify user");
    }
    else if (timeLeftToMeeting < 0)
    {
      console.log('you missed the meeting')
    }
     
    
    ///+ ':'+ currentDate.getMinutes();
   // console.log(currentTime);// get all suits and check if we need to remind
  //    if( (currentHours - suit.meeting_times.first) == suit.meetingRemainderHours.first)
  //   // {
  //   //    console.log('CronJob Called', time.toString()); // call here remind method implementations
  //   // } 
  // }
 }
}
 