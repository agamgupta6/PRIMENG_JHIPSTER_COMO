import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IComo } from 'app/shared/model//como.model';

export interface IAnswer {
    id?: number;
    text?: string;
    createdAt?: Moment;
    claps?: number;
    accepted?: boolean;
    createdBy?: IUser;
    como?: IComo;
}

export class Answer implements IAnswer {
    constructor(
        public id?: number,
        public text?: string,
        public createdAt?: Moment,
        public claps?: number,
        public accepted?: boolean,
        public createdBy?: IUser,
        public como?: IComo
    ) {
        this.accepted = this.accepted || false;
    }
}
