import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-timers-panel',
  templateUrl: './timers-panel.component.html',
  styleUrls: ['./timers-panel.component.scss'],
})
export class TimersPanelComponent implements OnInit {
  taskId = -1;

  taskResponse$ = new Observable<any>();
  taskSubscription = new Subscription();

  timersResponse$ = new Observable<any>();
  timersSubscription = new Subscription();

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
