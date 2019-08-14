import { TaskStatus } from '../task.model';

class GetTasksDto {
    status: TaskStatus;
    search: string;
}

export default GetTasksDto;
