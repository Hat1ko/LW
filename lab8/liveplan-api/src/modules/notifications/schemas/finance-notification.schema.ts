import {requiredMessage} from '../../../shared/constants/constant';

export const FinanceNotificationDefinition = {
    amount: {
        type: Number,
        required: [true, 'Amount' + requiredMessage],
    },
    periodicity: {
        required: [false],
        type: {
            interval: {
                type: Number,
                required: [true, 'Interval' + requiredMessage],
            },
            unit: {
                type: String,
                enum: ['day', 'week', 'month', 'year'],
                required: [true, 'Unit' + requiredMessage],
            },
        },
    },
};
