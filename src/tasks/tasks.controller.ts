import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TaskValidationStatusPipe } from './pipes/task-validation-status.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(
        @Query(ValidationPipe) filterDto: GetTasksDto,
    ): Promise<Task[]> {
        return this.taskService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(
        @Param('id') taskId: string,
    ): Promise<Task> {
        return this.taskService.getTaskById(taskId);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(
        @Param('id') taskId: string,
    ) {
        return this.taskService.deleteTaskById(taskId);
    }

    @Patch('/:id/status')
    updateStatus(
        @Body('status', TaskValidationStatusPipe) newStatus: TaskStatus,
        @Param('id') taskId: string,
    ) {
        return this.taskService.updateStatus(taskId, newStatus);
    }
}
