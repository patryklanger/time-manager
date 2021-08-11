import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-banned-users',
  templateUrl: './banned-users.component.html',
  styleUrls: ['./banned-users.component.scss'],
})
export class BannedUsersComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  dataFetched = false;
  isBanned = true;

  users: {
    userId: number;
    userName: string;
    firstName: string;
    lastName: string;
    position: string;
    email: string;
    role: string;
  }[] = [];
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.response$ = this.http.get(
      this.path + GlobalVariables.UsersPath + 'disabled',
      {
        headers: this.headers,
      },
    );
  }
  onUserDelete(userId: number) {
    const newUsersArray = this.users.filter((user) => user.userId != userId);
    this.users = newUsersArray;
  }
  ngOnInit(): void {
    this.subscription = this.response$.subscribe(
      (res) => {
        this.users = [...res];

        this.dataFetched = true;

        this.subscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
