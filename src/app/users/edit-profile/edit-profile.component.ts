import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';
import { KeycloakService } from 'keycloak-angular';

import {
  AbstractControl,
  ValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

const match: ValidatorFn = (fg: AbstractControl) => {
  const password = fg.get('newPassword')?.value;
  const confirm = fg.get('newConfirm')?.value;

  return password != confirm ? { noMatch: true } : null;
};

import { MyErrorStateMatcher } from 'src/app/utility/MyErrorStateMatcher';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxMessageComponent } from 'src/app/ui/dialog-box-message/dialog-box-message.component';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  loginExists = false;
  emailExists = false;
  @Input() userId = -1;
  @Input() title = 'Edit profile';
  @Input() subTitle =
    'If you want to edit your profile just <br />change information below';
  @Output() close = new EventEmitter<boolean>();
  currentUser: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    position: string;
    userName: string;
    userId?: number;
  } = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    position: '',
    userName: '',
    userId: 1,
  };

  password = '';

  isAdmin = false;
  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  formValidation: FormGroup;
  passwordGroupValidation: FormGroup;

  dataFetched = false;

  matcher = new MyErrorStateMatcher();

  showEditProfile = true;
  showDeleteProfile = false;
  accountAction = 'delete';
  passwordChange = false;

  userNameValidation = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
  ]);
  firstNameValidation = new FormControl('', [Validators.required]);
  lastNameValidation = new FormControl('', [Validators.required]);
  emailValidation = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  positionValidation = new FormControl('INTERN', []);
  roleValidation = new FormControl('MEMBER', []);
  passwordValidation = new FormControl('', [Validators.required]);
  passwordDeleteValidation = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  newPasswordValidation = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  newConfirmValidation = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  path = GlobalVariables.GlobalServerPath;

  getProfileSubscription = new Subscription();
  getProfileResponse$ = new Observable<any>();

  deleteAccSubscription = new Subscription();
  deleteAccResponse$ = new Observable<any>();

  editProfileSubscription = new Subscription();
  editProfileResponse$ = new Observable<any>();

  editPasswordSubscription = new Subscription();
  editPasswordResponse$ = new Observable<any>();

  constructor(
    private http: HttpClient,
    private builder: FormBuilder,
    private readonly keycloak: KeycloakService,
    private dialog: MatDialog,
  ) {
    this.formValidation = new FormGroup({
      firstname: this.firstNameValidation,
      lastname: this.lastNameValidation,
      email: this.emailValidation,
      username: this.userNameValidation,
      position: this.positionValidation,
      role: this.roleValidation,
    });
    this.passwordGroupValidation = new FormGroup(
      {
        password: this.passwordValidation,
        newPassword: this.newPasswordValidation,
        newConfirm: this.newConfirmValidation,
      },
      { validators: match },
    );
  }
  onSubmitClick() {
    if (this.showEditProfile && !this.passwordChange) {
      this.editProfile();
    }
  }
  editProfile() {
    if (!this.formValidation.valid) return;
    this.currentUser.userName = this.formValidation.get('username')?.value;
    this.currentUser.firstName = this.formValidation.get('firstname')?.value;
    this.currentUser.lastName = this.formValidation.get('lastname')?.value;
    this.currentUser.email = this.formValidation.get('email')?.value;
    this.currentUser.position = this.formValidation.get('position')?.value;
    this.currentUser.role = this.formValidation.get('role')?.value;
    let user: {
      firstName: string;
      lastName: string;
      email: string;
      role: string;
      position: string;
      userName: string;
      userId?: number;
      password?: string;
    } = this.currentUser;
    user['password'] = '';
    delete user['userId'];
    console.log(user);
    this.editProfileResponse$ = this.http.put(
      GlobalVariables.GlobalServerPath + '/profile',
      user,
    );
    this.editProfileSubscription = this.editProfileResponse$.subscribe(
      (res) => {
        console.log(res);
        this.editProfileSubscription.unsubscribe();
        window.location.reload();
        this.close.emit();
      },
      (err) => {
        if (err.error.userName || err.error.email) {
          if (err.error.userName) this.loginExists = true;
          else this.emailExists = true;
        } else this.errorHandler.handleError(err);
      },
    );
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
  onChangePasswordClick() {
    this.passwordChange = true;
  }
  onPasswordSubmitClick() {
    if (!this.passwordGroupValidation.valid) return;
    console.log('edit');

    let params = new HttpParams();
    params = params.append(
      'password',
      this.passwordGroupValidation.get('password')?.value,
    );
    params = params.append(
      'newPassword',
      this.passwordGroupValidation.get('newPassword')?.value,
    );

    this.editPasswordResponse$ = this.http.patch(
      GlobalVariables.GlobalServerPath + '/profile',
      params,
      { headers: this.headers },
    );
    this.editProfileSubscription = this.editPasswordResponse$.subscribe(
      (res) => {
        this.editPasswordSubscription.unsubscribe();
        const dialogAnchor = this.dialog.open(DialogBoxMessageComponent, {
          data: {
            title: 'You did it!',
            message: 'You have changed your password!',
          },
        });
        dialogAnchor.afterClosed().subscribe(() => this.close.emit());
      },
      (err) => this.errorHandler.handleError(err),
    );
  }
  onDeleteAccountClick() {
    let params = new HttpParams();
    params = params.append('password', this.passwordDeleteValidation.value);
    const options = {
      body: params,
    };
    this.deleteAccResponse$ = this.http.delete(
      GlobalVariables.GlobalServerPath + '/profile',
      options,
    );
    this.deleteAccSubscription = this.deleteAccResponse$.subscribe(
      (res) => {
        console.log(res);
        this.deleteAccSubscription.unsubscribe();
        this.keycloak.logout();
      },
      (err) => this.errorHandler.handleError(err),
    );
  }
  onPasswordChange() {}
  onAccountActionConfirm() {}
  ngOnInit(): void {
    let path = this.path + '/profile';
    this.getProfileResponse$ = this.http.get(path, {
      headers: this.headers,
    });
    console.log(this.currentUser.role);
    this.getProfileSubscription = this.getProfileResponse$.subscribe(
      (res) => {
        this.currentUser = res;
        this.formValidation
          .get('username')
          ?.setValue(this.currentUser.userName);
        this.formValidation
          .get('lastname')
          ?.setValue(this.currentUser.lastName);
        this.formValidation
          .get('firstname')
          ?.setValue(this.currentUser.firstName);
        this.formValidation.get('email')?.setValue(this.currentUser.email);
        this.formValidation
          .get('position')
          ?.setValue(this.currentUser.position);
        if (this.currentUser.role == 'ADMIN') this.isAdmin = true;
        this.formValidation.get('role')?.setValue(this.currentUser.role);
        this.dataFetched = true;
      },
      (err) => this.errorHandler.handleError(err),
    );
  }
  ngOnDestroy() {
    this.getProfileSubscription.unsubscribe();
    this.deleteAccSubscription.unsubscribe();
    this.editProfileSubscription.unsubscribe();
    this.editPasswordSubscription.unsubscribe();
  }
}
