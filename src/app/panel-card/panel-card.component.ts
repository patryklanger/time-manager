import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-panel-card',
  templateUrl: './panel-card.component.html',
  styleUrls: ['./panel-card.component.scss'],
})
export class PanelCardComponent implements OnInit {
  @Input() name = '';
  @Input() description = '';
  @Input() imgSource = '';
  constructor() {}

  ngOnInit(): void {}
}
