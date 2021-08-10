import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DialogBoxMessageComponent } from 'src/app/ui/dialog-box-message/dialog-box-message.component';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-edit-bucket',
  templateUrl: './edit-bucket.component.html',
  styleUrls: ['./edit-bucket.component.scss'],
})
export class EditBucketComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
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

  membersEmails: string[];

  editBucket = {
    bucketId: -1,
    owner: '',
    name: '',
    description: '',
    maxTaskCount: '',
    createdTime: '',
  };
  path = GlobalVariables.GlobalServerPath;

  headers = new HttpHeaders();

  bucketsSubscription = new Subscription();
  bucketMembersSubscription = new Subscription();
  editBucketSubscription = new Subscription();
  patchBucketMembersSubscription = new Subscription();

  getBucketResponse$ = new Observable<any>();
  getBucketMembersResponse$ = new Observable<any>();
  editBucketResponse$ = new Observable<any>();
  patchBucketMembersResponse$ = new Observable<any>();

  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
    this.membersEmails = [];
  }
  putBucket() {
    let putPath = this.path + GlobalVariables.BucketsPath + this.bucketId;
    let messageBucket = {
      name: this.editBucket.name,
      description: this.editBucket.description,
      maxTaskCount: this.editBucket.maxTaskCount,
    };
    let message = JSON.stringify(messageBucket);
    this.editBucketResponse$ = this.http.put(putPath, message, {
      headers: this.headers,
    });
    this.editBucketSubscription = this.editBucketResponse$.subscribe(
      (res) => {
        console.log('this is response: ');
        console.log(res);
        this.bucketEditted.emit(this.editBucket);
      },
      (err) => this.errorHandler.handleError(err),
    );
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
  onMembersAdded(members: any) {
    let arrayOfExistingUsersId: number[] = [];
    members.UserInDB.forEach(
      (e: {
        userId: number;
        userName: string;
        firstName: string;
        lastName: string;
        position: string;
        role: string;
        email: string;
      }) => {
        arrayOfExistingUsersId.push(e.userId);
      },
    );
    this.patchBucketMembersResponse$ = this.http.patch(
      this.path +
        GlobalVariables.BucketsPath +
        this.editBucket.bucketId +
        '/users',
      arrayOfExistingUsersId,
    );
    if (members.UserNoInDB.length > 0) {
      var message =
        "Following users cannot be added,\nbecause they weren't found in database: \n\n";
      members.UserNoInDB.forEach((e: string) => {
        message += e + '\n';
      });
      console.log(message);
      this.dialog.open(DialogBoxMessageComponent, {
        data: {
          title: 'Cannot add user',
          message: message,
        },
      });
    }
    this.patchBucketMembersSubscription =
      this.patchBucketMembersResponse$.subscribe(
        (res) => this.onSuccessfullyAdded(),
        (err) => this.errorHandler.handleError(err),
      );
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
    let path = this.path + GlobalVariables.BucketsPath + this.bucketId;
    this.getBucketResponse$ = this.http.get(path, {
      headers: this.headers,
    });
    path = this.path + GlobalVariables.BucketsPath + this.bucketId + '/users';
    this.getBucketMembersResponse$ = this.http.get(path, {
      headers: this.headers,
    });
    this.bucketsSubscription = this.getBucketResponse$.subscribe(
      (res) => {
        this.editBucket = res;
        this.dataFetched = true;
      },
      (err) => this.errorHandler.handleError(err),
    );
    this.bucketMembersSubscription = this.getBucketMembersResponse$.subscribe(
      (members) => {
        members.forEach(
          (e: {
            email: string;
            firstName: string;
            lastName: string;
            position: string;
            role: string;
            userId: number;
            userName: string;
          }) => {
            this.membersEmails.push(e.email);
          },
        );
      },
      (err) => this.errorHandler.handleError(err),
    );
  }
  ngOnDestroy() {
    if (this.bucketsSubscription) this.bucketsSubscription.unsubscribe();
    if (this.bucketMembersSubscription)
      this.bucketMembersSubscription.unsubscribe();
    if (this.editBucketSubscription) this.editBucketSubscription.unsubscribe();
  }
}
