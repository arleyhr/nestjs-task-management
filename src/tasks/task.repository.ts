import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository(Task)
class TaskRepository extends Repository<Task> {}

export {
    TaskRepository,
};
