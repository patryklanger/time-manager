import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrls: ['./users-panel.component.scss'],
})
export class UsersPanelComponent implements OnInit {
  title = 'Users';
  subTitle = 'Here you can edit and delete users profiles';
  users = [
    {
      userId: -1,
      userName: '',
      firstName: '',
      lastName: '',
      position: '',
      eMail: '',
      role: '',
    },
  ];
  constructor() {}
  ngOnInit(): void {
    this.users = [
      {
        userId: 12,
        userName: 'patryklanger',
        firstName: 'Patryk',
        lastName: 'Langer',
        position: 'Intern',
        eMail: 'patryklanger@icloud.com',
        role: 'Intern',
      },
      {
        userId: 12,
        userName: 'patryklanger',
        firstName: 'Patryk',
        lastName: 'Langer',
        position: 'Intern',
        eMail: 'patryklanger@icloud.com',
        role: 'Intern',
      },
      {
        userId: 12,
        userName: 'patryklanger',
        firstName: 'Patryk',
        lastName: 'Langer',
        position: 'Intern',
        eMail: 'patryklanger@icloud.com',
        role: 'Intern',
      },
      {
        userId: 12,
        userName: 'patryklanger',
        firstName: 'Patryk',
        lastName: 'Langer',
        position: 'Intern',
        eMail: 'patryklanger@icloud.com',
        role: 'Intern',
      },
    ];
  }
}
