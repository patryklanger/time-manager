import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-buckets',
  templateUrl: './my-buckets.component.html',
  styleUrls: ['./my-buckets.component.scss'],
})
export class MyBucketsComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  @Input() title = '';
  @Input() isOwner = true;
  @Input() subtitle = '';
  @Input() buckets = [
    {
      bucketId: 1,
      owner: '',
      name: '',
      description: '',
      maxTaskCount: '',
      createdTime: '',
    },
  ];
  dataFetched = false;
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.response$ = this.http.get(
      this.path + GlobalVariables.BucketsPath + 'owner',
      {
        headers: this.headers,
      },
    );
  }
  ngOnInit(): void {
    this.title = 'Buckets managed by you';
    this.subtitle = 'Here you can find all buckets managed by you';
    this.subscription = this.response$.subscribe(
      (res) => {
        this.buckets = [...res];
        this.dataFetched = true;
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
