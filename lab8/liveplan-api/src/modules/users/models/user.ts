import {Document} from 'mongoose';
import {MongoId} from '../../../shared/constants/constant';

export interface User extends Document {
    _id: MongoId;
    email: string;
    password: string;
    name: { first: string, last: string };
    photoUrl: string;
    role: string;
    refreshTokens: string [];
    isDeleted: boolean;

    hashPassword(password: string): Promise<void>;

    comparePasswords(password: string): Promise<boolean>;
}
