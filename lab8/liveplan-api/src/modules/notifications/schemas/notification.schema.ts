import {requiredMessage} from '../../../shared/constants/constant';

export const NotificationDefinition = {
    subTasks:
        {
            type:
                [{
                    task: {
                        type: String,
                        required: [true, 'Task' + requiredMessage]},
                    status: {
                        type: Boolean,
                        default: false,
                    },
                }],
        },
};
