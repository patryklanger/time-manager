import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-all-buckets-for-user',
  templateUrl: './all-buckets-for-user.component.html',
  styleUrls: ['./all-buckets-for-user.component.scss'],
})
export class AllBucketsForUserComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  title = 'All buckets you are part of';
  subtitle = 'Here you can find all buckets you are assigned to';
  dataFetched = false;
  buckets = [
    {
      bucketId: -1,
      owner: '',
      name: '',
      description: '',
      maxTaskCount: '',
      createdTime: '',
    },
  ];
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.response$ = this.http.get(this.path + GlobalVariables.BucketsPath, {
      headers: this.headers,
    });
  }

  ngOnInit(): void {
    this.subscription = this.response$.subscribe(
      (res) => {
        this.buckets = [...res];

        this.dataFetched = true;
        this.subscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
