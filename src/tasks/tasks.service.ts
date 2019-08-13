import { Injectable } from '@nestjs/common';
import * as uid from 'uid';

import { Task, TaskStatus } from './task.model';
import CreateTaskDto from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getTasks(): Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

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
