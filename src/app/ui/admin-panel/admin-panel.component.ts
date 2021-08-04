import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  constructor(private router: Router) {}
  onUsersClicked() {
    this.router.navigateByUrl('admin-panel/users');
  }
  onBucketsClicked() {
    this.router.navigateByUrl('admin-panel/buckets');
  }
  onTasksClicked() {
    this.router.navigateByUrl('admin-panel/tasks');
  }
  onUnassignedBucketsClicked() {
    this.router.navigateByUrl('admin-panel/buckets/unassigned');
  }
  ngOnInit(): void {}
}
