import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-tasks-for-user',
  templateUrl: './all-tasks-for-user.component.html',
  styleUrls: ['./all-tasks-for-user.component.scss'],
})
export class AllTasksForUserComponent implements OnInit {
  title = 'Your tasks';
  subTitle = 'You manage all tasks listed below';
  tasks = [
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

  ngOnInit(): void {
    this.tasks = [
      {
        taskId: 1,
        bucketName: 'Bucket',
        taskName: 'task no uno',
        creationTime: 'wtorek',
        taskPriority: 1,
        taskDeadline: 'wtorek',
        estDuration: '5 hours',
        taskOwner: 'Arturitto don Huano',
      },
      {
        taskId: 1,
        bucketName: 'Bucket',
        taskName: 'task no uno',
        creationTime: 'wtorek',
        taskPriority: 1,
        taskDeadline: 'wtorek',
        estDuration: '5 hours',
        taskOwner: 'Arturitto don Huano',
      },
      {
        taskId: 1,
        bucketName: 'Bucket',
        taskName: 'task no uno',
        creationTime: 'wtorek',
        taskPriority: 1,
        taskDeadline: 'wtorek',
        estDuration: '5 hours',
        taskOwner: 'Arturitto don Huano',
      },
      {
        taskId: 1,
        bucketName: 'Bucket',
        taskName: 'task no uno',
        creationTime: 'wtorek',
        taskPriority: 1,
        taskDeadline: 'wtorek',
        estDuration: '5 hours',
        taskOwner: 'Arturitto don Huano',
      },
      {
        taskId: 1,
        bucketName: 'Bucket',
        taskName: 'task no uno',
        creationTime: 'wtorek',
        taskPriority: 1,
        taskDeadline: 'wtorek',
        estDuration: '5 hours',
        taskOwner: 'Arturitto don Huano',
      },
    ];
  }
}
