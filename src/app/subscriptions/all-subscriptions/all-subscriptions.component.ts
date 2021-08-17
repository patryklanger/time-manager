import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-all-subscriptions',
  templateUrl: './all-subscriptions.component.html',
  styleUrls: ['./all-subscriptions.component.scss'],
})
export class AllSubscriptionsComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  response$ = new Observable<any>();
  subscription = new Subscription();
  dataFetched = false;
  isEmpty = true;

  @Input() subs: {
    subscriptionId: number;
    bucketName: string;
    taskName: string;
    guestEmail: string;
    subscriptionTime: string;
  }[] = [];

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.response$ = this.http.get(
      GlobalVariables.GlobalServerPath + '/subscriptions',
    );
    this.subscription = this.response$.subscribe(
      (res) => {
        this.subs = res;
        this.dataFetched = true;
        if (this.subs.length > 0) this.isEmpty = false;
        this.subscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
