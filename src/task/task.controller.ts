import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto,  updateTaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService){}

    @Get()
    getAllTask(){
        return this.taskService.getAllTask()
    }

    @Post()
    createTask(@Body() newTask: CreateTaskDto){
       return this.taskService.createTask(newTask.title, newTask.description)
    }

    @Delete(':id')
    deleteTask(@Param('id') id : string) {
        this.taskService.deleteTask(id)
    }

    @Put(':id')
    updateTask(@Param('id') id : string, @Body() updatedFields: updateTaskDto){
        return this.taskService.updateTask(id, updatedFields)
    }
}
