import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  currentUser = {
    firstName: 'Patryk',
    lastName: 'Langer',
    email: 'patryklanger@icloud.com',
  };
  showEditProfile = true;
  showDeleteProfile = false;
  accountAction = 'delete';
  constructor() {}
  onCancelClick() {
    this.showEditProfile = true;
    this.showDeleteProfile = false;
    this.close.emit(false);
  }
  onDeleteProfileClick() {
    this.showEditProfile = false;
    this.showDeleteProfile = true;
  }
  radioChecked(val: string) {
    this.accountAction = val;
    console.log(this.accountAction);
  }
  onAccountActionConfirm() {}
  ngOnInit(): void {}
}
