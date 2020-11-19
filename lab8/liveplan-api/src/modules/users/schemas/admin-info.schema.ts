import * as mongoose from 'mongoose';
import {UserSchema, UserSchemaDefinition} from './user.schema';

const Schema = mongoose.Schema;

const AdminInfoDefinition = {};

export const AdminInfoSchema = new Schema(Object.assign(AdminInfoDefinition, UserSchemaDefinition),
    {collection: 'users', timestamps: true});
AdminInfoSchema.methods = UserSchema.methods;
