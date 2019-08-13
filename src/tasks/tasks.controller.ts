import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import CreateTaskDto from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.taskService.getTasks();
    }

    @Get('/:id')
    getTaskById(
        @Param('id') taskId: string,
    ): Task {
        return this.taskService.getTaskById(taskId);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
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
        @Body('status') newStatus: string,
        @Param('id') taskId: string,
    ) {
        return this.taskService.updateStatus(taskId, newStatus);
    }
}
