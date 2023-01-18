import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Schedule } from './schedule.dto';
//import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Suit {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  day: Date;

  @Column()
  meeting_times: Schedule;

  @Column()
  @Type(() => Schedule)
  meetingRemainderHours: Schedule;
}
