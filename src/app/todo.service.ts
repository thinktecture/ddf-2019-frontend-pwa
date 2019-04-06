import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import v4 from 'uuid/v4';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private readonly databaseService: DatabaseService) { }

  public async add(text: string): Promise<string> {
    return await this.databaseService.todos.add({
      text,
      changed: false,
      completed: false,
      deleted: false,
      syncId: v4()
    });
  }

  public async getAll(): Promise<Todo[]> {
    return await this.databaseService.todos.toArray();
  }

  public async toggle(todo: Todo): Promise<string> {
    todo.completed = !todo.completed;
    return await this.databaseService.todos.put(todo);
  }
}
