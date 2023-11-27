import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.entity';
import { ObjectUnsubscribedError } from 'rxjs';
import { updateTaskDto } from './dto/task.dto';
@Injectable()
export class TaskService {

    //Simulates DB
    private task : Task[] = [{
        id: '1',
        title: 'first task',
        description: 'some task',
        status: TaskStatus.PENDING
    }]

    getAllTask() {
        return this.task;
    }

    createTask(title:string, description:string) {
        const addTask = {
            id: '1',
            title,
            description,
            status: TaskStatus.PENDING
        }
        this.task.push(addTask);
        return addTask;
    }

    getTaskById(id: string){
        return this.task.find(task => task.id === id)
    }
    updateTask(id: string, updatedFields: updateTaskDto): Task {
      const task =  this.getTaskById(id)
      const newTask = Object.assign(task, updatedFields)
      this.task = this.task.map(task => task.id === id ? newTask : task)
      return newTask;
    }

    deleteTask(id: string) {
     this.task = this.task.filter(task => task.id != id)
    }

}
