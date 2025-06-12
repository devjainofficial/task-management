import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskModel } from './models/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task {
  tasks: TaskModel[] = [];
  taskTitle: string = '';
  constructor(private taskService: TaskService){  }

  ngOnInit() {    
    this.tasks = this.taskService.getTasks();
  }

  onSubmit(){
    this.taskService.addTask(this.taskTitle);
    this.taskTitle = '';
  }

  toggleStatus(id: number){
    this.taskService.toggleTaskStatus(id);
  }

  deleteTask(id: number){
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }
}
