import { TimeLike } from 'fs';

/* eslint-disable prettier/prettier */
export class SuitDto {
  id: string;
  day: Date;
  meeting_times: {
    first: Date;
    second: Date;
  };
  meetingRemainderHours: {
    first: number;
    second: number;
  };
}
