import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  constructor(
    protected readonly keycloak: KeycloakService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  onLoginClick() {
    this.keycloak.login();
  }
  onRegisterClick() {
    this.router.navigate(['register'], { relativeTo: this.route });
  }
  ngOnInit(): void {}
}
