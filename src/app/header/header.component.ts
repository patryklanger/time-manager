import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showEditProfile = false;
  constructor(private router: Router,
    private readonly keycloak: KeycloakService) {}

  onLogoClick = () => {
    this.router.navigateByUrl('/user-panel');
  };
  onBucketsClick = () => {
    this.router.navigateByUrl('/buckets/my');
  };
  onTasksClick = () => {
    this.router.navigateByUrl('/tasks/my');
  };
  onAllBucketsClick = () => {
    this.router.navigateByUrl('/buckets/all');
  };
  onEditProfileClick() {
    this.showEditProfile = true;
  }
  onEditProfileClose() {
    this.showEditProfile = false;
  }
  onAllTasksClick() {
    this.router.navigateByUrl('/tasks/all');
  }
  onLogoutClick(){
    console.log('loged out')
    this.keycloak.logout();
  }

  ngOnInit(): void {}
}
