import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-buckets',
  templateUrl: './my-buckets.component.html',
  styleUrls: ['./my-buckets.component.scss'],
})
export class MyBucketsComponent implements OnInit {
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
    this.title = 'Buckets managed by you';
    this.subtitle = 'Here you can find all buckets manahed by you';
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
