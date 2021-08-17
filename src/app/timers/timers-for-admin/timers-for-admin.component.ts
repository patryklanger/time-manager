import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timers-for-admin',
  templateUrl: './timers-for-admin.component.html',
  styleUrls: ['./timers-for-admin.component.scss'],
})
export class TimersForAdminComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  timersResponse$ = new Observable<any>();
  timersSubscription = new Subscription();
  isEmpty = true;
  header = 'All timers';
  subheader = 'Here you can find all timers';
  isAdmin = true;
  dataFetched = false;

  timers: {
    timerId: number;
    userFullName: string;
    taskName: string;
    totalTime: number;
    state: string;
  }[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.timersResponse$ = this.http.get(
      GlobalVariables.GlobalServerPath + GlobalVariables.TimerPath + 'all',
    );
    this.timersSubscription = this.timersResponse$.subscribe(
      (res) => {
        this.timers = res;
        this.dataFetched = true;
        if (this.timers.length > 0) this.isEmpty = false;
        this.timersSubscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.timersSubscription.unsubscribe();
  }
}
