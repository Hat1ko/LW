import {BaseNotification} from './base-notification.model';

export class FinanceNotification extends BaseNotification {
    amount: number;
    periodicity: {
        interval: number;
        unit: string;
    }
}
