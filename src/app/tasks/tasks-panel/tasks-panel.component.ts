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
  @Input() managerTasks = [
    {
      taskId: 0,
      bucketName: '',
      taskName: '',
      owner: '',
      taskPriority: 0,
      taskDeadline: '',
      taskState: '',
      taskEditorsCount: 0,
      taskCreationTime: '',
      taskExpectedTime: -1,
      editorsCount: -1,
    },
  ];
  @Input() tasks = [
    {
      taskId: 0,
      bucketName: '',
      taskName: '',
      owner: '',
      taskPriority: 0,
      taskDeadline: '',
      taskState: '',
      taskEditorsCount: 0,
      taskCreationTime: '',
      taskExpectedTime: -1,
      editorsCount: -1,
    },
  ];
  constructor() {}
  addTaskShow = false;

  onShowAdding() {
    console.log('SHow adding');
    this.addTaskShow = true;
  }
  onCloseAdding() {
    this.addTaskShow = false;
  }

  ngOnInit(): void {
    this.normalTask = !this.managerTask;
  }
}
