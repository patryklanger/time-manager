import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel-main',
  templateUrl: './user-panel-main.component.html',
  styleUrls: ['./user-panel-main.component.scss'],
})
export class UserPanelMainComponent implements OnInit {
  @Input() name = '';
  constructor(private router: Router) {}
  adminPanelClick = () => {
    this.router.navigateByUrl('/admin-panel');
  };
  onBucketsClicked() {
    this.router.navigateByUrl('/buckets/all');
  }
  onYourBucketsClicked() {
    this.router.navigateByUrl('/buckets/my');
  }
  ngOnInit(): void {}
}
