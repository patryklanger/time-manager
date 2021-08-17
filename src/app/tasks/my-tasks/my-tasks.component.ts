import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss'],
})
export class MyTasksComponent implements OnInit {
  title = 'Tasks managed by you';
  subTitle = 'You manage all tasks listed below';
  dataFetched = false;
  errorHandler = new MyErrorHandler(this.dialog);
  tasks: {
    taskId: number;
    bucketName: string;
    taskName: string;
    owner: string;
    taskPriority: number;
    taskDescription: string;
    taskDeadline: string;
    taskState: string;
    taskEditorsCount: number;
    taskCreationTime: string;
    taskExpectedTime: number;
    taskTotalTime: number;
    editorsCount: number;
    totalTimeOfTimer: number;
    timerState: string;
  }[] = [];
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.response$ = this.http.get(this.path + GlobalVariables.TasksPath, {
      headers: this.headers,
    });
  }

  ngOnInit(): void {
    console.log('On tasks init');
    this.subscription = this.response$.subscribe(
      (res) => {
        console.log(res);
        this.tasks = res;
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
