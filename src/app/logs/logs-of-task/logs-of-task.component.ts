import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-logs-of-task',
  templateUrl: './logs-of-task.component.html',
  styleUrls: ['./logs-of-task.component.scss'],
})
export class LogsOfTaskComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);

  dataFetched = false;

  logs: {
    modificationType: string;
    timeOfModification: string;
    targetType: string;
    itemId: number;
    userName: string;
  }[] = [];

  elementId = -1;
  type = '';
  path = '';

  response$ = new Observable<any>();
  subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id'))
      this.elementId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.route.snapshot.paramMap.get('type'))
      this.type = String(this.route.snapshot.paramMap.get('type'));
    this.response$ = this.http.get(
      GlobalVariables.GlobalServerPath +
        '/' +
        this.type +
        '/' +
        this.elementId +
        '/logs/',
    );
    this.subscription = this.response$.subscribe(
      (res) => {
        this.logs = res;
        this.dataFetched = true;
        console.log(res);
        this.subscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
