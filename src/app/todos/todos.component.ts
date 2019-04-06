import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material';
import { SyncService } from '../sync.service';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  public todos: Promise<Todo[]>;

  constructor(private todoService: TodoService,
              private syncService: SyncService) { }

  ngOnInit() {
    this.syncService.updated.subscribe(() => this.update());
    this.update();
  }

  async createTodo(text: string) {
    await this.todoService.add(text);
    this.update();
  }

  update() {
    this.todos = this.todoService.getAll();
  }

  toggle(event: MatSelectionListChange) {
    const todo: Todo = event.option.value;
    todo.changed = true;
    this.todoService.toggle(todo);
  }

}
