import { Injectable } from '@nestjs/common';
import * as uid from 'uid';

import { Task, TaskStatus } from './task.model';
import CreateTaskDto from './dto/create-task.dto';
import GetTasksDto from './dto/get-tasks.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getTasks(query?: GetTasksDto): Task[] {
        if (query && (query.search || query.search)) {
            const { status, search } = query;
            let filteredTasks: Task[] = [...this.tasks];

            if (status) {
                filteredTasks = filteredTasks.filter(task => task.status === status);
            }

            if (search) {
                filteredTasks = filteredTasks.filter(task => task.title.includes(search) || task.description.includes(search));
            }

            return filteredTasks;
        }
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

    getTaskById(taskId: string): Task {
        const exists = this.tasks.find(task => task.id === taskId);

        return exists || null;
    }

    deleteTaskById(taskId: string): boolean {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        return !!!this.getTaskById(taskId);
    }

    updateStatus(taskId: string, status: string) {
        const task = this.tasks.find(item => item.id === taskId);
        const taskStatus = TaskStatus[status];

        if (!task) {
            return `Task ${taskId} not found`;
        }

        if (!taskStatus) {
            const validStatuses = Object.keys(TaskStatus).join(', ');
            return `Status ${status} not valid. Use ${validStatuses}`;
        }

        this.tasks = this.tasks.map(item => item.id === taskId ? ({
            ...item,
            status: taskStatus,
        }) : item);

        return {
            ...task,
            status: taskStatus,
        };
    }
}
