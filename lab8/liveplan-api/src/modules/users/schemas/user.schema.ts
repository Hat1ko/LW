import * as mongoose from 'mongoose';
import {requiredMessage} from '../../../shared/constants/constant';
import {ConfigService} from '../../../shared/config/config.service';

import * as bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const configService = new ConfigService(`${process.env.NODE_ENV || 'development'}.env`);

mongoose.set('useCreateIndex', true);

export const UserSchemaDefinition = {
    email: {type: String, required: [true, 'Email' + requiredMessage], unique: true},
    password: {type: String, required: [true, 'Password' + requiredMessage]},
    name: {
        type: {first: String, last: String},
        required: [true, 'Name' + requiredMessage],
    },
    photoUrl: {type: String, required: false},
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer',
        required: [true, 'Role' + requiredMessage],
    },
    refreshTokens: [String],
    isDeleted: {type: Boolean, default: false},
};

export const UserSchema = new Schema(UserSchemaDefinition,
    {timestamps: true, strictQuery: true, strict: true, useNestedStrict: true});

UserSchema.methods.hashPassword = async function (newPassword: string) {
    this.password = await bcrypt.hash(configService.get('LOCAL_HASH_SALT') +
        newPassword, Number(configService.get('SALT_ROUNDS')));
};

UserSchema.methods.comparePasswords = async function (enteredPassword: string) {
    return bcrypt.compare(configService.get('LOCAL_HASH_SALT') + enteredPassword, this.password);
};
