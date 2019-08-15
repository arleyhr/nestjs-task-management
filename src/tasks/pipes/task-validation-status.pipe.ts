import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task.model';

class TaskValidationStatusPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ];

    private isValidStatus(status: string) {
        return this.allowedStatuses.find(validStatus => validStatus === status);
    }

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isValidStatus(value)) {
            const validStatuses = this.allowedStatuses.join(', ');
            throw new BadRequestException(`Status ${value} not valid. Use ${validStatuses}`);
        }

        return value;
    }
}

export {
    TaskValidationStatusPipe,
};
