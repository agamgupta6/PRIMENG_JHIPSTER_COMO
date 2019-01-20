import { IComo } from 'app/shared/model//como.model';

export interface ITag {
    id?: number;
    name?: string;
    description?: string;
    comos?: IComo[];
}

export class Tag implements ITag {
    constructor(public id?: number, public name?: string, public description?: string, public comos?: IComo[]) {}
}
