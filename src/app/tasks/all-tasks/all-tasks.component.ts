import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
})
export class AllTasksComponent implements OnInit {
  title = 'All tasks';
  subTitle = 'Here you can find all tasks created with Time Manager';
  dataFetched = false;
  tasks = [
    {
      taskId: 0,
      bucketName: '',
      taskName: '',
      owner: '',
      taskPriority: 0,
      taskDeadline: '',
      taskState: '',
      taskEditorsCount: 0,
      taskCreationTime: '',
      taskExpectedTime: -1,
      editorsCount: -1,
    },
  ];
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.response$ = this.http.get(
      this.path + GlobalVariables.TasksPath + 'all',
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
