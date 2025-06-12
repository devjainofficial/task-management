import { Injectable } from '@angular/core';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: TaskModel[] = []
  private idCounter = 0;

  getTasks(): TaskModel[]{
    this.loadTasks();
    return this.tasks;
  }

  addTask(title: string): void{
    const trimmed = title.trim();

    if(trimmed && !this.tasks.find(t => t.title === trimmed)){
      
      this.tasks.push({
        id: ++this.idCounter,
        title: trimmed,
        isCompleted: false
      });
      this.saveTasks();
    }
  }

  toggleTaskStatus(id: number): void{
    const task = this.tasks.find(t => t.id === id);
    if(task){
      task.isCompleted = !task.isCompleted;
      this.saveTasks();
    }
  }

  deleteTask(id: number): void{
    this.tasks = this.tasks.filter(t => t.id !== id)
    this.saveTasks();
  }

  private saveTasks(): void{
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private loadTasks(): void{
    const saved = localStorage.getItem('tasks');

    if(saved){ 
      this.tasks = JSON.parse(saved);
    }
  }
}

