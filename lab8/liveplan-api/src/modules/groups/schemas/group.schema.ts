import {requiredMessage} from '../../../shared/constants/constant';
import * as mongoose from 'mongoose';

export const GroupSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name' + requiredMessage]},
    description: {type: String},
    messageText: {type: String},
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    icon: {type: mongoose.Types.ObjectId, ref: 'Icon'},
}, {
    strictQuery: true,
    timestamps: true,
    useNestedStrict: true,
});
