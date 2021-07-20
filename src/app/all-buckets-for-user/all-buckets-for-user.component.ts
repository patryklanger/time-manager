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
      bucketId: -1,
      owner: '',
      name: '',
      description: '',
      maxTaskCount: '',
      createdTime: ''
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.title = 'All buckets you are part of';
    this.subtitle = 'Here you can find all buckets you are assigned to';
    
  }
}
