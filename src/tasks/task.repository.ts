import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository, Like, Equal,  } from 'typeorm';
import * as uid from 'uid';

import { Task } from './task.entity';
import { GetTasksDto } from './dto/get-tasks.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {
    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();

        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        return task.save();
    }

    findTasks(query?: GetTasksDto): Promise<Task[]> {
        const taskQuery: any = {};
        if (query && query.search || query.status) {
            const { status, search } = query;

            if (status) {
                taskQuery.status = Equal(status);
            }

            if (search) {
                taskQuery.title = Like(`%${search}%`);
                taskQuery.description = Like(`%${search}%`);
            }
        }

        return this.find(taskQuery);
    }

    findTaskById(id: string): Promise<Task> {
        return this.findOne(id);
    }

    async updateTaskStatus(taskId: string, status: TaskStatus): Promise<Task> {
        const task = await this.findTaskById(taskId);

        if (!task) {
            throw new NotFoundException(`Task '${taskId}' not found`);
        }

        task.status = status;

        return task.save();
    }

}

export {
    TaskRepository,
};
