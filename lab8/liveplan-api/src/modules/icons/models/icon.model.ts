import {Document} from 'mongoose';

export interface Icon extends Document {
    _id: string,
    key: string,
    name: string,
    pictureUrl: string,
    iconPackId: string;
}
