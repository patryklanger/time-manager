import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
  @Output() close = new EventEmitter<boolean>();
  showBucketOptions = false;
  showEditBucket = false;
  @Input() bucket = {
    bucketId: 1,
    owner: '',
    name: '',
    description: '',
    maxTaskCount: '',
  };
  constructor(private router: Router) {}
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

  ngOnInit(): void {}
}
