import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getTasks(query?: GetTasksDto): Promise<Task[]> {
        return await this.taskRepository.findTasks(query);
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto);
    }

    async getTaskById(taskId: string): Promise<Task> {
        const foundTask = await this.taskRepository.findOne(taskId);

        if (!foundTask) {
            throw new NotFoundException(`Not found task with id '${taskId}'`);
        }

        return foundTask;
    }

    async deleteTaskById(taskId: string): Promise<boolean> {
        const task = await this.taskRepository.findTaskById(taskId);
        if (!task) {
            throw new NotFoundException(`Task '${taskId}' not found`);
        }

        await task.remove();

        return true;
    }

    // updateStatus(taskId: string, status: string) {
    //     const task = this.tasks.find(item => item.id === taskId);
    //     const taskStatus = TaskStatus[status];

    //     if (!task) {
    //         throw new NotFoundException(`Task '${taskId}' not found`);
    //     }

    //     this.tasks = this.tasks.map(item => item.id === taskId ? ({
    //         ...item,
    //         status: taskStatus,
    //     }) : item);

    //     return {
    //         ...task,
    //         status: taskStatus,
    //     };
    // }
}
