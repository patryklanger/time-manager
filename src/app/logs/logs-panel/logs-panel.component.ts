import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs-panel',
  templateUrl: './logs-panel.component.html',
  styleUrls: ['./logs-panel.component.scss'],
})
export class LogsPanelComponent implements OnInit {
  @Input() dataFetched = false;

  @Input() logs: {
    modificationType: string;
    timeOfModification: string;
    targetType: string;
    itemId: number;
    userName: string;
  }[] = [];

  constructor() {}

  ngOnInit(): void {}
}
