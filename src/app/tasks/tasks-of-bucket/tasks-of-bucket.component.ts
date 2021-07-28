import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-tasks-of-bucket',
  templateUrl: './tasks-of-bucket.component.html',
  styleUrls: ['./tasks-of-bucket.component.scss'],
})
export class TasksOfBucketComponent implements OnInit {
  bucketId = 0;
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
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id'))
      this.bucketId = Number(this.route.snapshot.paramMap.get('id'));
    this.response$ = this.http.get(
      this.path + GlobalVariables.BucketsPath + this.bucketId + '/tasks',
      {
        headers: this.headers,
      },
    );
    this.subscription = this.response$.subscribe((res) => {
      console.log(res);
      this.tasks = res;
      this.dataFetched = true;
    });
  }
}
