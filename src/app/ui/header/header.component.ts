import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showEditProfile = false;
  login = 'login';
  profile = 'Edit profile';
  constructor(
    private router: Router,
    private readonly keycloak: KeycloakService,
    private http: HttpClient,
  ) {}

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
    this.keycloak.isLoggedIn().then((res) => {
      if (!res) return;
      this.showEditProfile = true;
    });
  }
  response$ = new Observable<any>();
  subscription = new Subscription();

  getUserName() {
    this.response$ = this.http.get(
      GlobalVariables.GlobalServerPath + '/profile',
    );
    this.subscription = this.response$.subscribe((res) => {
      this.profile = res.firstName + ' ' + res.lastName;
      console.log(this.profile);
    });
  }
  onEditProfileClose() {
    this.showEditProfile = false;
  }
  onAllTasksClick() {
    this.router.navigateByUrl('/tasks/all');
  }
  onLogoutClick() {
    this.keycloak.isLoggedIn().then((res) => {
      if (!res) this.keycloak.login();
      else this.keycloak.logout();
    });
    this.keycloak.logout();
  }

  ngOnInit(): void {
    this.keycloak.isLoggedIn().then((res) => {
      if (!res) this.login = 'Login';
      else {
        this.login = 'Logout';
        this.getUserName();
      }
    });
  }
}
