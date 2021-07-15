import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  showEditProfile = false;
  color = '#727272';
  user = {
    userId: 0,
    userName: '',
    firstName: '',
    lastName: '',
    position: '',
    eMail: '',
    role: '',
  };
  constructor() {}
  onEditToggle() {
    this.showEditProfile = !this.showEditProfile;
  }

  ngOnInit(): void {
    this.user = {
      userId: 12,
      userName: 'patryklanger',
      firstName: 'Patryk',
      lastName: 'Langer',
      position: 'Intern',
      eMail: 'patryklanger@icloud.com',
      role: 'Intern',
    };
  }
}
