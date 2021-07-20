import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.scss'],
})
export class UsersPanelComponent implements OnInit {
  title = 'Users';
  subTitle = 'Here you can edit and delete users profiles';
  dataFetched = false;
  users = [
    {
      userId: -1,
      userName: '',
      firstName: '',
      lastName: '',
      position: '',
      eMail: '',
      role: '',
    },
  ];
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.response$ = this.http.get(this.path + '/users', {
      headers: this.headers,
    });
  }
  ngOnInit(): void {
    this.subscription = this.response$.subscribe((res) => {
      this.users = [...res];

      this.dataFetched = true;
      console.log(this.users);
      console.log(this.dataFetched);
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
