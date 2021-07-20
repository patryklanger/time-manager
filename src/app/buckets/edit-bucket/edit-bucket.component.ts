import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ComponentFactoryResolver,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-edit-bucket',
  templateUrl: './edit-bucket.component.html',
  styleUrls: ['./edit-bucket.component.scss'],
})
export class EditBucketComponent implements OnInit {
  @Input() bucketId = -1;

  @Output() close = new EventEmitter<boolean>();
  @Output() bucketEditted = new EventEmitter<{
    bucketId: number;
    owner: string;
    name: string;
    description: string;
    maxTaskCount: string;
    createdTime: string;
  }>();
  modals = {
    name: true,
    description: false,
    maxTask: false,
    team: false,
  };
  dataFetched = false;

  editBucket = {
    bucketId: -1,
    owner: '',
    name: '',
    description: '',
    maxTaskCount: '',
    createdTime: '',
  };
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  bucketsSubscription = new Subscription();
  bucketMembersSubscription = new Subscription();
  editBucketSubscription = new Subscription();
  getBucketResponse$ = new Observable<any>();
  getBucketMembersResponse$ = new Observable<any>();
  editBucketResponse$ = new Observable<any>();
  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }
  errorHandler = (err: any) => {
    alert(err.message);
    console.log(err);
  };
  putBucket() {
    let putPath = this.path + '/buckets/' + this.bucketId;
    let messageBucket = {
      name: this.editBucket.name,
      description: this.editBucket.description,
      maxTaskCount: this.editBucket.maxTaskCount,
    };
    let message = JSON.stringify(messageBucket);
    this.editBucketResponse$ = this.http.put(putPath, message, {
      headers: this.headers,
    });
    this.editBucketSubscription = this.editBucketResponse$.subscribe((res) => {
      console.log('this is response: ');
      console.log(res);
      this.bucketEditted.emit(this.editBucket);
    }, this.errorHandler);
  }

  onNameAdded(name: string) {
    this.editBucket.name = name;
    this.modals.name = false;
    this.modals.description = true;
  }
  onDescriptionAdded(description: string) {
    this.editBucket.description = description;
    this.modals.description = false;
    this.modals.maxTask = true;
  }
  onMaxTaskAdded(maxTask: string) {
    this.editBucket.maxTaskCount = maxTask;
    this.modals.maxTask = false;
    this.modals.team = true;
  }
  onMembersAdded(members: string) {
    // const teamX = [''];
    // teamX.push(members);
    const teamX = '';
    this.editBucket.createdTime = teamX;
    this.onSuccessfullyAdded();
  }
  onCancelClick() {
    this.modals.name = true;
    this.modals.description = false;
    this.modals.maxTask = false;
    this.modals.team = false;
    this.close.emit(false);
  }
  onSuccessfullyAdded() {
    this.modals.name = true;
    this.modals.description = false;
    this.modals.maxTask = false;
    this.modals.team = false;

    this.putBucket();
  }
  ngOnInit(): void {
    let path = this.path + '/buckets/' + this.bucketId;
    this.getBucketResponse$ = this.http.get(path, {
      headers: this.headers,
    });
    path = this.path + '/buckets/' + this.bucketId + '/users';
    this.getBucketMembersResponse$ = this.http.get(path, {
      headers: this.headers,
    });
    this.bucketsSubscription = this.getBucketResponse$.subscribe((res) => {
      this.editBucket = res;
      this.dataFetched = true;
    });
    this.bucketMembersSubscription = this.getBucketMembersResponse$.subscribe(
      (res) => {
        // console.log(res);
      },
      this.errorHandler,
    );
  }
  ngOnDestroy() {
    console.log('destroy');
    this.bucketsSubscription.unsubscribe();
    this.bucketMembersSubscription.unsubscribe();
    if (this.editBucketSubscription) this.editBucketSubscription.unsubscribe();
  }
}
