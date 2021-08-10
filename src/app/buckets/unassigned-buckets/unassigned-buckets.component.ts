import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';
@Component({
  selector: 'app-unassigned-buckets',
  templateUrl: './unassigned-buckets.component.html',
  styleUrls: ['./unassigned-buckets.component.scss'],
})
export class UnassignedBucketsComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  title = 'Unassigned buckets';
  subtitle = "Here you can find all buckets, that aren't assigned to any user";

  unassigned = true;

  fetchedBuckets: {
    bucketId: number;
    name: string;
    owner: string | undefined;
    description: string;
    maxTaskCount: string;
    createdTime: string;
  }[] = [];
  buckets: {
    bucketId: number;
    name: string;
    owner: string;
    description: string;
    maxTaskCount: string;
    createdTime: string;
  }[] = [];

  headers = new HttpHeaders();

  subscription = new Subscription();
  response$ = new Observable<any>();

  dataFetched = false;

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.response$ = this.http.get(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.BucketsPath +
        'unowned',
      {
        headers: this.headers,
      },
    );
    this.subscription = this.response$.subscribe(
      (res) => {
        this.buckets = res;
        this.buckets.forEach((bucket) => (bucket['owner'] = 'NO OWNER'));
        this.dataFetched = true;
        this.subscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
