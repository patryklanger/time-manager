import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-timers-for-admin',
  templateUrl: './timers-for-admin.component.html',
  styleUrls: ['./timers-for-admin.component.scss'],
})
export class TimersForAdminComponent implements OnInit {
  timersResponse$ = new Observable<any>();
  timersSubscription = new Subscription();

  header = 'All timers';
  subheader = 'Here you can find all timers';

  dataFetched = false;

  timers: {
    timerId: number;
    userFullName: string;
    taskName: string;
    totalTime: number;
    state: string;
  }[] = [];

  constructor(private http: HttpClient) {
    this.timersResponse$ = this.http.get(
      GlobalVariables.GlobalServerPath + GlobalVariables.TimerPath + 'all',
    );
    this.timersSubscription = this.timersResponse$.subscribe((res) => {
      this.timers = res;
      this.dataFetched = true;
      this.timersSubscription.unsubscribe();
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.timersSubscription.unsubscribe();
  }
}
