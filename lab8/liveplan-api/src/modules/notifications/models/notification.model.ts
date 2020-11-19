import {MongoId} from '../../../shared/constants/constant';
import {BaseNotification} from './base-notification.model';

export class Notification extends BaseNotification {
    subTasks: {
        _id: MongoId;
        status: boolean,
        task: string,
    }[];
}
