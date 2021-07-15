import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent implements OnInit {
  title = 'All tasks';
  subTitle = 'Here you can find all tasks created with Time Manager';
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
