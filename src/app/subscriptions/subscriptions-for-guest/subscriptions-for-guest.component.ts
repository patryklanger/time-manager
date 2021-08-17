import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-subscriptions-for-guest',
  templateUrl: './subscriptions-for-guest.component.html',
  styleUrls: ['./subscriptions-for-guest.component.scss'],
})
export class SubscriptionsForGuestComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  guestId = -1;

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

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id'))
      this.guestId = Number(this.route.snapshot.paramMap.get('id'));
    this.response$ = this.http.get(
      GlobalVariables.GlobalServerPath +
        '/subscriptions/guests/' +
        this.guestId,
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
}
