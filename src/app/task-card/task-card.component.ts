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
  constructor() {}

  ngOnInit(): void {}
}
