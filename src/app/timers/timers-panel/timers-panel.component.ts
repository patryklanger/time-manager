import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-timers-panel',
  templateUrl: './timers-panel.component.html',
  styleUrls: ['./timers-panel.component.scss'],
})
export class TimersPanelComponent implements OnInit {
  taskId = -1;
  @Input() isEmpty = true;
  @Input() dataFetched = false;

  @Input() isAdmin = false;

  @Input() header = '';
  @Input() subheader = '';

  @Input() taskname = '';
  @Input() timers: {
    timerId: number;
    userFullName: string;
    taskName: string;
    totalTime: number;
    state: string;
  }[] = [];
  constructor() {}
  onTimerDelete(timerId: number) {
    const newTimersArray = this.timers.filter(
      (timer) => timer.timerId != timerId,
    );
    this.timers = newTimersArray;
  }
  ngOnInit(): void {}
}
