import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-all-buckets',
  templateUrl: './all-buckets.component.html',
  styleUrls: ['./all-buckets.component.scss'],
})
export class AllBucketsComponent implements OnInit {
  title = 'All buckets';
  subtitle = 'Here you can find all buckets created with Time Manager';
  @Input() buckets = [
    {
      bucketId: -1,
      owner: '',
      name: '',
      description: '',
      maxTaskCount: '',
    },
  ];
  constructor() {}

  ngOnInit(): void {
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
