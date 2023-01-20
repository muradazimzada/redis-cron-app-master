import { ObjectID } from 'typeorm';
export declare class Schedule {
    first: Date;
    second: Date;
}
export declare class Suit {
    _id: ObjectID;
    day: Date;
    meeting_times: Schedule;
    meetingRemainderHours: Schedule;
}
