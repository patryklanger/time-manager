import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-add-members-modal',
  templateUrl: './add-members-modal.component.html',
  styleUrls: ['./add-members-modal.component.scss'],
})
export class AddMembersModalComponent implements OnInit {
  textareaContent = '';

  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();

  userArray = [];

  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }
  keyDownOnTextarea() {
    this.response$ = this.http.get(
      this.path + '/findUserByEmail?substring=' + this.textareaContent,
    );
    this.subscription = this.response$.subscribe(
      (res) => {
        this.userArray = res;
        console.log(res);
      },
      (err) => console.log(err.error),
    );
  }

  ngOnInit(): void {}
}
