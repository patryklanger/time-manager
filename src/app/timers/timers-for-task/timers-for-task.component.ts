import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-timers-for-task',
  templateUrl: './timers-for-task.component.html',
  styleUrls: ['./timers-for-task.component.scss'],
})
export class TimersForTaskComponent implements OnInit {
  taskId = -1;

  taskResponse$ = new Observable<any>();
  taskSubscription = new Subscription();

  timersResponse$ = new Observable<any>();
  timersSubscription = new Subscription();

  header = '';
  subheader = 'Here you can find all timers of that task';

  dataFetched = false;

  timers: {
    timerId: number;
    userFullName: string;
    taskName: string;
    totalTime: number;
    state: string;
  }[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id'))
      this.taskId = Number(this.route.snapshot.paramMap.get('id'));

    this.taskResponse$ = this.http.get(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.taskId,
    );
    this.taskSubscription = this.taskResponse$.subscribe((res) => {
      this.header = 'Timers of ' + res.taskName;
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
      this.dataFetched = true;
    });
  }
  ngOnDestroy() {
    this.timersSubscription.unsubscribe();
    this.taskSubscription.unsubscribe();
  }
}
