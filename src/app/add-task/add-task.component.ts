import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Output() closeEmitter = new EventEmitter<boolean>();
  constructor() {}
  modals = {
    name: true,
    description: false,
    state: false,
    priority: false,
    deadline: false,
    estDuration: false,
    team: false,
  };
  newTask = {
    name: '',
    description: '',
    state: '',
    priority: '',
    deadline: '',
    estDuration: '',
    team: [''],
  };
  onNameAdded(name: string) {
    this.newTask.name = name;
    this.modals.name = false;
    this.modals.description = true;
  }

  onCancelClick() {
    this.closeEmitter.emit(false);
  }
  ngOnInit(): void {}
}
