import * as mongoose from 'mongoose';
import {UserSchema, UserSchemaDefinition} from './user.schema';

const Schema = mongoose.Schema;

const CustomerInfoDefinition = {
    iconPacks: [{type: mongoose.Types.ObjectId, ref: 'IconPack'}],
};

export const CustomerInfoSchema = new Schema(Object.assign(CustomerInfoDefinition, UserSchemaDefinition),
    {collection: 'users', timestamps: true});
CustomerInfoSchema.methods = UserSchema.methods;
