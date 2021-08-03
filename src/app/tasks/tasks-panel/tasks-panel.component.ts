import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-panel',
  templateUrl: './tasks-panel.component.html',
  styleUrls: ['./tasks-panel.component.scss'],
})
export class TasksPanelComponent implements OnInit {
  @Input() managerTask = true;
  normalTask = false;
  @Input() title = '';
  @Input() subTitle = '';
  @Input() managerTasks: {
    taskId: number;
    bucketName: string;
    taskName: string;
    owner: string;
    taskPriority: number;
    taskDescription: string;
    taskDeadline: string;
    taskState: string;
    taskEditorsCount: number;
    taskCreationTime: string;
    taskExpectedTime: number;
    editorsCount: number;
    totalTimeOfTimer: number;
    timerState: string;
  }[] = [];
  @Input() tasks: {
    taskId: number;
    bucketName: string;
    taskName: string;
    owner: string;
    taskPriority: number;
    taskDescription: string;
    taskDeadline: string;
    taskState: string;
    taskEditorsCount: number;
    taskCreationTime: string;
    taskExpectedTime: number;
    editorsCount: number;
    totalTimeOfTimer: number;
    timerState: string;
  }[] = [];
  constructor() {}
  addTaskShow = false;

  onShowAdding() {
    this.addTaskShow = true;
  }
  onCloseAdding() {
    this.addTaskShow = false;
  }

  ngOnInit(): void {
    this.normalTask = !this.managerTask;
  }
}
