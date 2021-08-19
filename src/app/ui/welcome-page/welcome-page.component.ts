import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(
    protected readonly keycloak: KeycloakService,
    private router: Router,
  ) {}
  onLoginClick() {
    this.keycloak.login();
  }
  onRegisterClick() {
    this.router.navigateByUrl('register');
  }
  ngOnInit(): void {
    this.keycloak.isLoggedIn().then((res) => {
      if (res) this.router.navigateByUrl('user-panel');
    });
  }
}
