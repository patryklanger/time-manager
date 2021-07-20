import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  showBucketOptions = false;
  showEditBucket = false;
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
  constructor(private router: Router, private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }
  errorHandler = (err: any) => {
    alert(err.message);
    console.log(err);
  };
  bucketClicked() {
    this.showBucketOptions = true;
  }
  onShowTasksClick() {
    // this.router.navigate(['/tasks/bucket'], {
    //   queryParams: { bucketId: this.bucket.bucketId },
    this.router.navigateByUrl('tasks/bucket/' + this.bucket.bucketId);
  }
  onEditBucketClick() {
    this.showBucketOptions = false;
    this.showEditBucket = true;
  }
  onEditBucketClose() {
    this.showEditBucket = false;
  }
  onBucketOptionsClose() {
    this.showBucketOptions = false;
  }
  onBucketEditted(bucket: any) {
    console.log(bucket);
    this.bucket = bucket;
    this.showEditBucket = false;
  }
  onDeleteBucketClicked() {
    console.log(this.bucket.bucketId);
    let deletePath = this.path + '/buckets/' + this.bucket.bucketId;
    this.response$ = this.http.delete(deletePath, { headers: this.headers });
    this.subscription = this.response$.subscribe(
      (res) => {
        console.log(res);
        this.delete.emit(this.bucket.bucketId);
        this.showBucketOptions = false;
      },
      (err) => console.log(err),
    );
  }

  ngOnInit(): void {}
}
