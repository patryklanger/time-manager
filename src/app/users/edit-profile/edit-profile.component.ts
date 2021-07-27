import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() userId = -1;
  @Input() title = 'Edit profile';
  @Input() subTitle =
    'If you want to edit your profile just <br />change information below';
  @Output() close = new EventEmitter<boolean>();
  @Input() currentUser = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    position: '',
    userName: '',
  };
  showEditProfile = true;
  showDeleteProfile = false;
  accountAction = 'delete';

  path = GlobalVariables.GlobalServerPath;

  headers = new HttpHeaders();

  getProfileSubscription = new Subscription();
  editProfileSubscription = new Subscription();

  getProfileResponse$ = new Observable<any>();
  editProfileResponse$ = new Observable<any>();

  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }
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
  }
  onAccountActionConfirm() {}
  ngOnInit(): void {
    let path = this.path + '/profile';
    this.getProfileResponse$ = this.http.get(path, {
      headers: this.headers,
    });
    this.getProfileSubscription = this.getProfileResponse$.subscribe((res) => {
      this.currentUser = res;
    });
  }
  ngOnDestroy() {}
}
