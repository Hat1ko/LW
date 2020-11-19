import * as mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);
import mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

export const IconSchema = new Schema({
    key: {type: String, unique: true},
    name: String,
    pictureUrl: String,
    iconPackId: {type: mongoose.Types.ObjectId, ref: 'IconPack'},
}, {strictQuery: true, timestamps: true});

IconSchema.plugin(mongoosePaginate);
