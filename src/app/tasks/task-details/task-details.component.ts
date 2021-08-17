import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  @Input() name = '';
  @Input() description = '';
  @Input() taskCreationTime = new Date();
  @Input() taskTotalTime = 0;
  @Output() close = new EventEmitter<boolean>();

  onCloseClick() {
    this.close.emit(false);
  }
  constructor() {}

  ngOnInit(): void {}
}
