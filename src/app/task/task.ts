import { Component, OnInit } from '@angular/core';
import { TaskService } from './services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from './models/task.model';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css'
})
export class Task implements OnInit {
  taskForm!: FormGroup; 
  tasks: TaskModel[] = [];
  
  constructor(private fb: FormBuilder, private taskService: TaskService){  }

  ngOnInit() {    
    this.taskForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]]
    })

    this.loadTasks();
  }

  loadTasks(): void{
    this.tasks = this.taskService.getTasks();
  }

  onSubmit(){
    if(this.taskForm.invalid) return;
    const title = this.taskForm.value.title;
    this.taskService.addTask(title);
    this.taskForm.reset();
    this.loadTasks();
  }

  toggleStatus(id: number){
    this.taskService.toggleTaskStatus(id);
    this.loadTasks();
  }

  deleteTask(id: number){
    this.taskService.deleteTask(id);
    this.loadTasks();
  }
}
