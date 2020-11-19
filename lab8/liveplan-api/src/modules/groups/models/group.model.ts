import {Document} from 'mongoose';
import {MongoId} from '../../../shared/constants/constant';

export class Group extends Document {
    _id: MongoId;
    name: string;
    description: string;
    messageText: string;
    user: MongoId;
    icon: MongoId;
}
