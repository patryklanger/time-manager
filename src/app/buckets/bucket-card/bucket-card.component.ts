import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SureDialogComponentComponent } from 'src/app/ui/sure-dialog-component/sure-dialog-component.component';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-bucket-card',
  templateUrl: './bucket-card.component.html',
  styleUrls: ['./bucket-card.component.scss'],
})
export class BucketCardComponent implements OnInit {
  // @Input() owner = '';
  // @Input() name = '';
  // @Input() description = '';
  // @Input() maxTaskCount = '';
  @Output() delete = new EventEmitter<number>();

  showEditBucket = false;
  showAddTask = false;

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
  errorHandler = (err: any) => {
    alert(err.message);
    console.log(err);
  };
  onShowTasksClick() {
    this.router.navigateByUrl('tasks/bucket/' + this.bucket.bucketId);
  }
  onEditBucketClick() {
    this.showEditBucket = true;
  }
  onEditBucketClose() {
    this.showEditBucket = false;
  }
  onBucketEditted(bucket: any) {
    console.log(bucket);
    this.bucket = bucket;
    this.showEditBucket = false;
  }
  onAddTaskClick() {
    this.showAddTask = true;
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
        (err) => console.log(err),
      );
    });
  }

  ngOnInit(): void {}
}
