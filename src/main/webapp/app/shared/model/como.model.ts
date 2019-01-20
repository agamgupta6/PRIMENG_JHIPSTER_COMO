import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ITag } from 'app/shared/model//tag.model';

export const enum Type {
    Como = 'Como',
    Question = 'Question'
}

export interface IComo {
    id?: number;
    title?: string;
    text?: string;
    claps?: number;
    createdAt?: Moment;
    type?: Type;
    createdBy?: IUser;
    tags?: ITag[];
}

export class Como implements IComo {
    constructor(
        public id?: number,
        public title?: string,
        public text?: string,
        public claps?: number,
        public createdAt?: Moment,
        public type?: Type,
        public createdBy?: IUser,
        public tags?: ITag[]
    ) {}
}
