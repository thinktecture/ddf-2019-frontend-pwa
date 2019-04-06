import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DatabaseService } from './database.service';
import { Todo } from './todo';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private updatedSubject = new Subject<void>();
  public updated: Observable<void> = this.updatedSubject;

  constructor(private todoService: TodoService,
              private databaseService: DatabaseService,
              private httpClient: HttpClient) { }

  public async sync() {
    const todos = await this.todoService.getAll();
    this.httpClient.post<Todo[]>('http://localhost:5000/api/sync/', todos)
      .subscribe(newTodos => {
        Promise.all(newTodos.map(t => this.databaseService.todos.put(t)))
          .then(() => this.updatedSubject.next());
      });
  }
}
