import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buckets-panel',
  templateUrl: './buckets-panel.component.html',
  styleUrls: ['./buckets-panel.component.scss'],
})
export class BucketsPanelComponent implements OnInit {
  showBuckets = false;
  @Input() buckets = [
    {
      bucketId: -1,
      owner: '',
      name: '',
      description: '',
      maxTaskCount: '',
      createdTime: '',
    },
  ];
  @Input() title = '';
  @Input() subTitle = '';
  constructor() {}

  addBucketShow = false;

  addBucket() {
    this.addBucketShow = true;
  }
  addBucketClosed(success: boolean) {
    this.addBucketShow = false;
  }
  onBucketAdded(event: any) {
    let bucket = {
      bucketId: -1,
      owner: '',
      name: '',
      description: '',
      maxTaskCount: '',
      createdTime: '',
    };
    bucket = event;
    this.buckets.unshift(bucket);
    if (!this.showBuckets) this.showBuckets = true;
    this.addBucketShow = false;
  }
  onBucketDeleted(bucketId: number) {
    const buckets = this.buckets.filter((el) => el.bucketId != bucketId);
    this.buckets = buckets;
  }
  ngOnInit(): void {
    if (this.buckets.length > 0)
      if (this.buckets[0].bucketId !== -1) this.showBuckets = true;
    console.log(this.showBuckets);
  }
}
