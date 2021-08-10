import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SureDialogComponentComponent } from 'src/app/ui/sure-dialog-component/sure-dialog-component.component';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-bucket-card',
  templateUrl: './bucket-card.component.html',
  styleUrls: ['./bucket-card.component.scss'],
})
export class BucketCardComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  // @Input() owner = '';
  // @Input() name = '';
  // @Input() description = '';
  // @Input() maxTaskCount = '';
  @Output() delete = new EventEmitter<number>();

  showEditBucket = false;
  showAddTask = false;
  showAssignBucket = false;

  @Input() isUnassigned = false;

  @Input() bucket = {
    bucketId: -1,
    owner: '',
    name: '',
    description: '',
    maxTaskCount: '',
    createdTime: '',
  };
  response$ = new Observable<any>();
  subscription = new Subscription();

  assignRresponse$ = new Observable<any>();
  assignSubscription = new Subscription();

  path = GlobalVariables.GlobalServerPath;
  headers = new HttpHeaders();

  constructor(
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
  ) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }
  onShowTasksClick() {
    this.router.navigateByUrl('tasks/bucket/' + this.bucket.bucketId);
  }
  onEditBucketClick() {
    this.showEditBucket = true;
  }
  onEditBucketClose() {
    this.showEditBucket = false;
  }
  onAssignBucketClick() {
    this.showAssignBucket = true;
  }
  onBucketEditted(bucket: any) {
    console.log(bucket);
    this.bucket = bucket;
    this.showEditBucket = false;
  }
  onAddTaskClick() {
    this.showAddTask = true;
  }
  selectUserClosed(userId: number) {
    this.showAssignBucket = false;
    if (userId != -1) {
      this.assignRresponse$ = this.http.put(
        GlobalVariables.GlobalServerPath +
          GlobalVariables.BucketsPath +
          'unowned/' +
          userId +
          '/' +
          this.bucket.bucketId,
        null,
      );
      this.assignSubscription = this.assignRresponse$.subscribe(
        (res) => {
          console.log(res);
          this.delete.emit(this.bucket.bucketId);
        },
        (err) => this.errorHandler.handleError(err),
      );
    }
  }
  onAddTaskClose() {
    this.showAddTask = false;
  }
  onDeleteBucketClicked() {
    const dialogAnchor = this.dialog.open(SureDialogComponentComponent, {
      data: {
        title: 'You are deleting bucket',
        message: 'Are you sure you want to delete this bucket?',
      },
    });
    dialogAnchor.afterClosed().subscribe((e) => {
      if (!e) return;
      let deletePath =
        this.path + GlobalVariables.BucketsPath + this.bucket.bucketId;
      this.response$ = this.http.delete(deletePath, { headers: this.headers });
      this.subscription = this.response$.subscribe(
        (res) => {
          console.log(res);
          this.delete.emit(this.bucket.bucketId);
        },
        (err) => this.errorHandler.handleError(err),
      );
    });
  }

  ngOnInit(): void {}
}
