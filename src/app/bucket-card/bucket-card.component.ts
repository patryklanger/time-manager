import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bucket-card',
  templateUrl: './bucket-card.component.html',
  styleUrls: ['./bucket-card.component.scss'],
})
export class BucketCardComponent implements OnInit {
  @Input() author = '';
  @Input() bucketName = '';
  @Input() description = '';
  @Input() maxTasksAmount = '';
  constructor() {}

  ngOnInit(): void {}
}
