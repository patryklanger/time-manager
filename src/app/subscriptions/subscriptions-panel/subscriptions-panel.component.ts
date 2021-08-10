import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriptions-panel',
  templateUrl: './subscriptions-panel.component.html',
  styleUrls: ['./subscriptions-panel.component.scss'],
})
export class SubscriptionsPanelComponent implements OnInit {
  @Input() dataFetched = false;

  @Input() subs: {
    subscriptionId: number;
    bucketName: string;
    taskName: string;
    guestEmail: string;
    subscriptionTime: string;
  }[] = [];

  constructor() {}

  onSubDelete(subId: number) {
    this.subs = this.subs.filter((el) => el.subscriptionId != subId);
  }

  ngOnInit(): void {}
}
