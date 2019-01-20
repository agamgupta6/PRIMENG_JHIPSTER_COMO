import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IComo } from 'app/shared/model//como.model';
import { IAnswer } from 'app/shared/model//answer.model';

export interface IComment {
    id?: number;
    text?: string;
    createdAt?: Moment;
    createdBy?: IUser;
    como?: IComo;
    answer?: IAnswer;
}

export class Comment implements IComment {
    constructor(
        public id?: number,
        public text?: string,
        public createdAt?: Moment,
        public createdBy?: IUser,
        public como?: IComo,
        public answer?: IAnswer
    ) {}
}
