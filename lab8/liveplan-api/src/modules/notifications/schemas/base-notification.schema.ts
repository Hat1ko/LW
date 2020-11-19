import * as mongoose from 'mongoose';
import {requiredMessage} from '../../../shared/constants/constant';

export const BaseNotificationSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name' + requiredMessage]},
    description: String,
    date: {type: Date, required: [true, 'Date' + requiredMessage]},
    group: {
        type: mongoose.Types.ObjectId,
        ref: 'Group',
        required: [true, 'GroupId' + requiredMessage],
    },
    remind: {type: Boolean, default: false},
    isFavorite: {type: Boolean, default: false},
    status: {type: Boolean, default: false},
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'userId' + requiredMessage],
    },
},
{collection: 'notifications'});
