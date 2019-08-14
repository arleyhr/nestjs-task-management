import { Injectable, NotFoundException } from '@nestjs/common';
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
        const foundTask = this.tasks.find(task => task.id === taskId);

        if (!foundTask) {
            throw new NotFoundException(`Not found task with id '${taskId}'`);
        }

        return foundTask;
    }

    deleteTaskById(taskId: string): boolean {
        if (!this.tasks.find(task => task.id === taskId)) {
            throw new NotFoundException(`Task '${taskId}' not found`);
        }

        this.tasks = this.tasks.filter(task => task.id !== taskId);

        return true;
    }

    updateStatus(taskId: string, status: string) {
        const task = this.tasks.find(item => item.id === taskId);
        const taskStatus = TaskStatus[status];

        if (!task) {
            throw new NotFoundException(`Task '${taskId}' not found`);
        }

        if (!taskStatus) {
            const validStatuses = Object.keys(TaskStatus).join(', ');
            throw new NotFoundException(`Status ${status} not valid. Use ${validStatuses}`);
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
