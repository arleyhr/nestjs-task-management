import { Injectable } from '@nestjs/common';
import * as uid from 'uid';

import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getTasks(): Task[] {
        return this.tasks;
    }

    createTask(title: string, description: string): Task {
        const task: Task = {
            id: uid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }
}
