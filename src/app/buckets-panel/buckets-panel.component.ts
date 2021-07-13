import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buckets-panel',
  templateUrl: './buckets-panel.component.html',
  styleUrls: ['./buckets-panel.component.scss'],
})
export class BucketsPanelComponent implements OnInit {
  constructor() {}
  addBucketShow = false;
  addBucket() {
    this.addBucketShow = true;
  }
  addBucketClosed(success: boolean) {
    this.addBucketShow = false;
  }
  ngOnInit(): void {}
}
