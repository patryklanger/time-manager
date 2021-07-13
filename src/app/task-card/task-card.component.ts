import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  @Input() bucket = '';
  @Input() taskName = '';
  @Input() deadline = '';
  @Input() state = '';
  @Input() timeleft = '';
  @Input() editors = '';
  @Input() author = '';
  @Input() maxTasksAmount = '';
  @Input() priority = '';
  priorityColor = {
    low: '#1F9C00',
    medium: '#BABD10',
    high: '#B52920',
  };
  color = '';
  constructor() {}
  getColor() {
    if (this.priority == 'low') this.color = this.priorityColor.low;
    else if (this.priority == 'medium') this.color = this.priorityColor.medium;
    else this.color = this.priorityColor.high;
  }
  ngOnInit(): void {
    this.getColor();
  }
}
