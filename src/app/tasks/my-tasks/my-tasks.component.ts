import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss'],
})
export class MyTasksComponent implements OnInit {
  title = 'Tasks managed by you';
  subTitle = 'You manage all tasks listed below';
  tasks = [
    {
      taskId: 0,
      bucketName: '',
      taskName: '',
      taskPriority: 0,
      taskDeadline: '',
      taskState: '',
      taskEditorsCount: 0,
      taskOwner: '',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.tasks = [
      {
        taskId: 1,
        bucketName: 'Bucket',
        taskName: 'task no uno',
        taskPriority: 1,
        taskDeadline: 'wtorek',
        taskState: 'NEW',
        taskEditorsCount: 7,
        taskOwner: 'Arturitto don Huano',
      },
      {
        taskId: 1,
        bucketName: 'Bucket',
        taskName: 'task no uno',
        taskPriority: 1,
        taskDeadline: 'wtorek',
        taskState: 'NEW',
        taskEditorsCount: 7,
        taskOwner: 'Arturitto don Huano',
      },
      {
        taskId: 1,
        bucketName: 'Bucket',
        taskName: 'task no uno',
        taskPriority: 1,
        taskDeadline: 'wtorek',
        taskState: 'NEW',
        taskEditorsCount: 7,
        taskOwner: 'Arturitto don Huano',
      },
      {
        taskId: 1,
        bucketName: 'Bucket',
        taskName: 'task no uno',
        taskPriority: 2,
        taskDeadline: 'wtorek',
        taskState: 'NEW',
        taskEditorsCount: 7,
        taskOwner: 'Arturitto don Huano',
      },
      {
        taskId: 1,
        bucketName: 'Bucket',
        taskName: 'task no uno',
        taskPriority: 3,
        taskDeadline: 'wtorek',
        taskState: 'NEW',
        taskEditorsCount: 7,
        taskOwner: 'Arturitto don Huano',
      },
    ];
  }
}
