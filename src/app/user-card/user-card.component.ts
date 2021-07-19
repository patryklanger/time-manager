import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  showEditProfile = false;
  color = '#727272';
  @Input() user = {
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

  ngOnInit(): void {}
}
