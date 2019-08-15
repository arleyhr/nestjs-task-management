import { EntityRepository, Repository, Like } from 'typeorm';
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

        task.id = uid();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        return task.save();
    }
    findTasks(query?: GetTasksDto) {
        const taskQuery: any = {};

        if (query && (query.search || query.search)) {
            const { status, search } = query;

            if (status) {
                taskQuery.status = status;
            }

            if (search) {
                taskQuery.title = Like(`%${search}%`);
                taskQuery.description = Like(`%${search}%`);
            }
        }

        return this.find(taskQuery);
    }
    findTaskById(id: string) {
        return this.findOne(id);
    }
}

export {
    TaskRepository,
};
