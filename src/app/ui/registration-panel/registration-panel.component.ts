import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';
import { MyErrorStateMatcher } from '../../utility/MyErrorStateMatcher';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MyErrorHandler } from 'src/app/utility/error-handler';

@Component({
  selector: 'app-registration-panel',
  templateUrl: './registration-panel.component.html',
  styleUrls: ['./registration-panel.component.scss'],
})
export class RegistrationPanelComponent implements OnInit {
  emailExists = false;
  loginExists = false;

  errorHandler = new MyErrorHandler(this.dialog);
  @ViewChild('formDirective') private formDirective: NgForm;
  title = 'Registration';
  submittedCheck = false;
  registrated = false;
  formValidator: FormGroup;
  passwordCheck = '';
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  matcher = new MyErrorStateMatcher();

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
  passwordValidation = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  textareaContent = '';
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.formValidator = new FormGroup({
      position: this.positionValidation,
      firstname: this.firstNameValidation,
      lastname: this.lastNameValidation,
      email: this.emailValidation,
      username: this.userNameValidation,
      password: this.passwordValidation,
      role: this.roleValidation,
    });

    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }
  resetForm() {
    this.loginExists = false;
    this.emailExists = false;
    this.formValidator.reset();
    this.formValidator.get('position')?.setValue('INTERN');
    this.formValidator.get('role')?.setValue('TEAM_MANAGER');
    this.formDirective.resetForm();
  }
  onModalClose() {
    this.registrated = false;
  }
  onSubmitClick() {
    this.submittedCheck = true;
    console.log(this.formValidator.get('role')?.value);
    if (!this.formValidator.valid) return;
    let newUser = {
      userName: this.formValidator.get('username')?.value,
      password: this.formValidator.get('password')?.value,
      role: this.formValidator.get('role')?.value,
      firstName: this.formValidator.get('firstname')?.value,
      email: this.formValidator.get('email')?.value,
      lastName: this.formValidator.get('lastname')?.value,
      position: this.formValidator.get('position')?.value,
    };
    this.submittedCheck = false;

    console.log(newUser);
    this.response$ = this.http.post(this.path + '/register', newUser, {
      headers: this.headers,
    });
    this.subscription = this.response$.subscribe(
      (res) => {
        this.submittedCheck = false;
        this.resetForm();
        this.registrated = true;
      },
      (err) => {
        if (err.error.userName || err.error.email) {
          if (err.error.userName === 'exists') {
            this.loginExists = true;
            this.formValidator.get('userName')?.markAsDirty();
          }
          if (err.error.email === 'exists') {
            this.emailExists = true;
            this.formValidator.get('email')?.markAsDirty();
          }
        } else this.errorHandler.handleError(err);

        console.log(this.emailExists, this.loginExists);
      },
    );
  }

  ngOnInit(): void {}
}
