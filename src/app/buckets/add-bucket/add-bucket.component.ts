import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.scss'],
})
export class AddBucketComponent implements OnInit {
  @Output() closeEmitter = new EventEmitter<boolean>();
  @Output() bucketAdded = new EventEmitter<{
    bucketId: number;
    cretedTime: string;
    description: string;
    maxTaskCount: string;
    name: string;
    owner: string;
  }>();
  modals = {
    name: true,
    description: false,
    maxTask: false,
    team: false,
  };
  responseBucket = {
    bucketId: -1,
    cretedTime: '',
    description: '',
    maxTaskCount: '',
    name: '',
    owner: '',
  };
  newBucket = {
    name: '',
    description: '',
    maxTask: '',
  };
  dataFetched = false;
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }
  errorHandler = (err: any) => {
    console.log(err);
  };
  onNameAdded(name: string) {
    this.newBucket.name = name;
    this.modals.name = false;
    this.modals.description = true;
  }
  onDescriptionAdded(description: string) {
    this.newBucket.description = description;
    this.modals.description = false;
    this.modals.maxTask = true;
  }
  onMaxTaskAdded(maxTask: string) {
    this.newBucket.maxTask = maxTask;
    this.modals.maxTask = false;
    this.onSuccessfullyAdded();
  }
  onCancelClick() {
    this.modals.name = true;
    this.modals.description = false;
    this.modals.maxTask = false;
    this.modals.team = false;
    this.closeEmitter.emit(false);
  }
  onSuccessfullyAdded() {
    console.log(this.newBucket);

    let bucket = {
      name: this.newBucket.name,
      description: this.newBucket.description,
      maxTaskCount: Number(this.newBucket.maxTask),
    };

    this.response$ = this.http.post(
      this.path + GlobalVariables.BucketsPath,
      JSON.stringify(bucket),
      {
        headers: this.headers,
      },
    );
    this.subscription = this.response$.subscribe((res) => {
      console.log(res);
      this.responseBucket = res;
      this.bucketAdded.emit(this.responseBucket);

      this.modals.name = true;
      this.modals.description = false;
      this.modals.maxTask = false;
      this.modals.team = false;
    }, this.errorHandler);
  }
  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
