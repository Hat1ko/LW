import {Document} from 'mongoose';

export interface IconPack extends Document {
    _id: string,
    key: string,
    name: string,
    users: string[];
}
