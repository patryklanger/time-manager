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
      bucketName: 'XD',
      taskName: '',
      taskPriority: 0,
      taskDeadline: '',
      taskState: '',
      taskEditorsCount: 0,
      taskOwner: '',
    },
  ];
  @Input() tasks = [
    {
      taskId: 0,
      bucketName: '',
      taskName: '',
      creationTime: '',
      taskPriority: 0,
      taskDeadline: '',
      estDuration: '',
      taskOwner: '',
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
