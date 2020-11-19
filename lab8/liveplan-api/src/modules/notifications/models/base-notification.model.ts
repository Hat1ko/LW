import {MongoId} from '../../../shared/constants/constant';
import * as mongoose from 'mongoose';

export class BaseNotification extends mongoose.Document {
    _id: MongoId;
    name: string;
    description: string;
    date: Date;
    group: MongoId;
    remind: boolean;
    isFavorite: boolean;
    status: boolean;
    user: MongoId;
}
