import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-all-buckets-for-user',
  templateUrl: './all-buckets-for-user.component.html',
  styleUrls: ['./all-buckets-for-user.component.scss'],
})
export class AllBucketsForUserComponent implements OnInit {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() buckets = [
    {
      bucketId: 1,
      owner: '',
      name: '',
      description: '',
      maxTaskCount: '',
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.title = 'All buckets you are part of';
    this.subtitle = 'Here you can find all buckets you are assigned to';
    this.buckets = [
      {
        bucketId: 1,
        owner: 'Artur Lamnger',
        name: 'Bucket',
        description: 'This is my bucket',
        maxTaskCount: '7',
      },
      {
        bucketId: 2,
        owner: 'Artur Lamnger',
        name: 'Bucket',
        description: 'This is my bucket',
        maxTaskCount: '7',
      },
      {
        bucketId: 3,
        owner: 'Artur Lamnger',
        name: 'Bucket',
        description: 'This is my bucket',
        maxTaskCount: '7',
      },
      {
        bucketId: 4,
        owner: 'Artur Lamnger',
        name: 'Bucket',
        description: 'This is my bucket',
        maxTaskCount: '7',
      },
      {
        bucketId: 5,
        owner: 'Artur Lamnger',
        name: 'Bucket',
        description: 'This is my bucket',
        maxTaskCount: '7',
      },
    ];
  }
}
