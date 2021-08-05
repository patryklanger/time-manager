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
  onTaskDelete(taskId: number) {
    console.log(this.tasks);
    const newTasksArray = this.tasks.filter((task) => {
      return task.taskId != taskId;
    });
    const newManagerTasksArray = this.managerTasks.filter((task) => {
      return task.taskId != taskId;
    });
    this.managerTasks = newManagerTasksArray;
    console.log(newTasksArray);
    this.tasks = newTasksArray;
  }
  ngOnInit(): void {
    console.log('do it');
    this.normalTask = !this.managerTask;
  }
}
