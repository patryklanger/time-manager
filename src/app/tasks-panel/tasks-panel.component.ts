import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks-panel',
  templateUrl: './tasks-panel.component.html',
  styleUrls: ['./tasks-panel.component.scss'],
})
export class TasksPanelComponent implements OnInit {
  constructor() {}
  addTaskShow = false;

  onShowAdding() {
    this.addTaskShow = true;
  }
  onCloseAdding() {
    this.addTaskShow = false;
  }

  ngOnInit(): void {}
}
