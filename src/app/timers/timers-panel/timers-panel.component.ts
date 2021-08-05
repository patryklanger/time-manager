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

  @Input() taskname = '';
  @Input() timers: {
    timerId: number;
    userFullName: string;
    taskName: string;
    totalTime: number;
    state: string;
  }[] = [];
  constructor(private http: HttpClient, private route: ActivatedRoute) {}
  onTimerDelete(timerId: number) {
    const newTimersArray = this.timers.filter(
      (timer) => timer.timerId != timerId,
    );
    this.timers = newTimersArray;
  }
  ngOnInit(): void {
    console.log('active');

    if (this.route.snapshot.paramMap.get('id'))
      this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskResponse$ = this.http.get(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.taskId,
    );
    this.taskSubscription = this.taskResponse$.subscribe((res) => {
      this.taskname = res.taskName;
      this.taskSubscription.unsubscribe();
    });

    this.timersResponse$ = this.http.get(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.taskId +
        GlobalVariables.TimerPath +
        'all',
    );
    this.timersSubscription = this.timersResponse$.subscribe((res) => {
      console.log(res);
      this.timers = res;
      this.timersSubscription.unsubscribe();
    });
  }
}
