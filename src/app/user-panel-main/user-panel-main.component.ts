import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-user-panel-main',
  templateUrl: './user-panel-main.component.html',
  styleUrls: ['./user-panel-main.component.scss'],
})
export class UserPanelMainComponent implements OnInit {
  userRole = [''];
  welcomeName = '';
  constructor(private router: Router, private readonly kc: KeycloakService) {}
  adminPanelClick = () => {
    this.router.navigateByUrl('/admin-panel');
  };
  onBucketsClicked() {
    this.router.navigateByUrl('/buckets/all');
  }
  onYourBucketsClicked() {
    this.router.navigateByUrl('/buckets/my');
  }
  onTasksClicked() {
    this.router.navigateByUrl('tasks/all');
  }
  onYourTasksClicked() {
    this.router.navigateByUrl('tasks/my');
  }
  isAdmin() {
    if (this.userRole.includes('ADMIN')) return true;
    return false;
  }
  ngOnInit(): void {
    try {
      this.userRole = this.kc.getUserRoles();
      let token: any = this.kc.getKeycloakInstance().tokenParsed;
      if (token.given_name !== '') this.welcomeName == token.given_name;
      else this.welcomeName = token.preferred_username;
    } catch (e) {
      console.log('failed to load user data', e);
    }
  }
}
