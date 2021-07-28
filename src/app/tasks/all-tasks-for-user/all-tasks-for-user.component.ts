import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-all-tasks-for-user',
  templateUrl: './all-tasks-for-user.component.html',
  styleUrls: ['./all-tasks-for-user.component.scss'],
})
export class AllTasksForUserComponent implements OnInit {
  title = 'Your tasks';
  subTitle = 'You manage all tasks listed below';
  dataFetched = false;
  tasks: {
    taskId: number;
    bucketName: string;
    taskName: string;
    owner: string;
    taskPriority: number;
    taskDeadline: string;
    taskState: string;
    taskEditorsCount: number;
    taskCreationTime: string;
    taskExpectedTime: number;
    editorsCount: number;
  }[] = [];
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.response$ = this.http.get(
      this.path + GlobalVariables.TasksPath + 'shared',
      {
        headers: this.headers,
      },
    );
  }

  ngOnInit(): void {
    console.log('On tasks init');
    this.subscription = this.response$.subscribe((res) => {
      console.log(res);
      this.tasks = res;
      this.dataFetched = true;
    });
  }
}
