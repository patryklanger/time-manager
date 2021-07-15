import { decimalDigest } from '@angular/compiler/src/i18n/digest';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  // @Input() bucket = '';
  // @Input() taskName = '';
  // @Input() deadline = '';
  // @Input() state = '';
  // @Input() timeleft = '';
  // @Input() editors = '';
  // @Input() author = '';
  // @Input() maxTasksAmount = '';
  // @Input() priority = '';
  timeleft = '';
  color = '';
  @Input() managerTask = {
    taskId: 0,
    bucketName: '',
    taskName: '',
    taskPriority: 0,
    taskDeadline: '',
    taskState: '',
    taskEditorsCount: 0,
    taskOwner: '',
  };
  @Input() task = {
    taskId: 0,
    bucketName: '',
    taskName: '',
    creationTime: '',
    taskPriority: 0,
    taskDeadline: '',
    estDuration: '',
    taskOwner: '',
  };

  @Input() managerCard = true;
  normalCard = false;

  priorityColor = {
    low: '#1F9C00',
    medium: '#BABD10',
    high: '#B52920',
  };
  constructor() {}
  getColor() {
    if (this.managerCard) {
      if (this.managerTask.taskPriority == 1)
        this.color = this.priorityColor.low;
      else if (this.managerTask.taskPriority == 2)
        this.color = this.priorityColor.medium;
      else this.color = this.priorityColor.high;
    } else {
      if (this.task.taskPriority == 1) this.color = this.priorityColor.low;
      else if (this.task.taskPriority == 2)
        this.color = this.priorityColor.medium;
      else this.color = this.priorityColor.high;
    }
  }
  ngOnInit(): void {
    this.normalCard = !this.managerCard;
    this.getColor();
    if (this.managerCard) this.timeleft = this.managerTask.taskDeadline;
    else this.timeleft = this.task.taskDeadline;
  }
}
