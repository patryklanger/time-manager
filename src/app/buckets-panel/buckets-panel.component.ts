import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buckets-panel',
  templateUrl: './buckets-panel.component.html',
  styleUrls: ['./buckets-panel.component.scss'],
})
export class BucketsPanelComponent implements OnInit {
  @Input() buckets = [
    {
      bucketId: 1,
      owner: '',
      name: '',
      description: '',
      maxTaskCount: '',
    },
  ];
  @Input() title = '';
  @Input() subTitle = '';
  constructor() {}
  addBucketShow = false;
  // buckets = [
  //   {
  //     bucketId: 1,
  //     owner: 'Artur Lamnger',
  //     name: 'Bucket',
  //     description: 'This is my bucket',
  //     maxTaskCount: '7',
  //   },
  //   {
  //     bucketId: 2,
  //     owner: 'Artur Lamnger',
  //     name: 'Bucket',
  //     description: 'This is my bucket',
  //     maxTaskCount: '7',
  //   },
  //   {
  //     bucketId: 3,
  //     owner: 'Artur Lamnger',
  //     name: 'Bucket',
  //     description: 'This is my bucket',
  //     maxTaskCount: '7',
  //   },
  //   {
  //     bucketId: 4,
  //     owner: 'Artur Lamnger',
  //     name: 'Bucket',
  //     description: 'This is my bucket',
  //     maxTaskCount: '7',
  //   },
  //   {
  //     bucketId: 5,
  //     owner: 'Artur Lamnger',
  //     name: 'Bucket',
  //     description: 'This is my bucket',
  //     maxTaskCount: '7',
  //   },
  // ];
  addBucket() {
    this.addBucketShow = true;
  }
  addBucketClosed(success: boolean) {
    this.addBucketShow = false;
  }
  ngOnInit(): void {}
}
