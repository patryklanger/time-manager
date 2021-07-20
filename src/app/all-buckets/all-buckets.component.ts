import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../globals';

@Component({
  selector: 'app-all-buckets',
  templateUrl: './all-buckets.component.html',
  styleUrls: ['./all-buckets.component.scss'],
})
export class AllBucketsComponent implements OnInit {
  title = 'All buckets';
  subtitle = 'Here you can find all buckets created with Time Manager';
  dataFetched = false;
  @Input() buckets = [
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
  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.response$ = this.http.get(this.path + '/buckets/all', {
      headers: this.headers,
    });
  }
  ngOnInit(): void {
    this.subscription = this.response$.subscribe((res) => {
      this.buckets = [...res];
      this.dataFetched = true;
      console.log(this.buckets);
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
