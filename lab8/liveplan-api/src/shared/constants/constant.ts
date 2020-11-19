import * as mongoose from 'mongoose';

export const requiredMessage = ' must be not empty';

export type MongoId = mongoose.Types.ObjectId;
export const Connections = mongoose.connections;
export const defaultPacks = ['pack1'];
