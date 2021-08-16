import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as GlobalVariables from '../../globals';
import { Observable, Subscription } from 'rxjs';
import { SureDialogComponentComponent } from 'src/app/ui/sure-dialog-component/sure-dialog-component.component';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import { Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/utility/MyErrorStateMatcher';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  showEditProfile = false;
  dataFetched = false;
  color = '#727272';

  editUser = false;
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

  response$ = new Observable<any>();
  subscription = new Subscription();

  formValidation: FormGroup;

  headers = new HttpHeaders();

  @Output() unbanned = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Input() isBanned: boolean = false;
  @Input() user = {
    userId: 0,
    userName: '',
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    role: '',
  };

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.formValidation = new FormGroup({
      firstname: this.firstNameValidation,
      lastname: this.lastNameValidation,
      email: this.emailValidation,
      username: this.userNameValidation,
      position: this.positionValidation,
      role: this.roleValidation,
    });
  }
  onEditToggle() {
    this.showEditProfile = !this.showEditProfile;
  }
  onBanUserClick() {
    const dialogAnchor = this.dialog.open(SureDialogComponentComponent, {
      data: {
        title: 'You are banning user',
        message: 'Are you sure you want to ban this user?',
      },
    });
    dialogAnchor.afterClosed().subscribe((e) => {
      if (!e) return;
      let deletePath =
        GlobalVariables.GlobalServerPath +
        GlobalVariables.UsersPath +
        this.user.userId;
      this.response$ = this.http.patch(deletePath, { headers: this.headers });
      this.subscription = this.response$.subscribe(
        (res) => {
          this.delete.emit(this.user.userId);
          this.subscription.unsubscribe();
        },
        (err) => this.errorHandler.handleError(err),
      );
    });
  }
  onEditUserClick() {
    this.firstNameValidation.setValue(this.user.firstName);
    this.editUser = true;
  }
  onSubmitClick() {}
  onShowLogsClick() {
    this.router.navigateByUrl('admin-panel/logs/users/' + this.user.userId);
  }
  onUnbanUserClick() {
    const dialogAnchor = this.dialog.open(SureDialogComponentComponent, {
      data: {
        title: 'You are unbanning user',
        message: 'Are you sure you want to unban this user?',
      },
    });
    dialogAnchor.afterClosed().subscribe((e) => {
      if (!e) return;
      let deletePath =
        GlobalVariables.GlobalServerPath +
        GlobalVariables.UsersPath +
        this.user.userId;
      this.response$ = this.http.patch(
        GlobalVariables.GlobalServerPath +
          GlobalVariables.UsersPath +
          'disabled/' +
          this.user.userId,
        { headers: this.headers },
      );
      this.subscription = this.response$.subscribe(
        (res) => {
          console.log(res);
          this.unbanned.emit(this.user.userId);
          this.subscription.unsubscribe();
        },
        (err) => this.errorHandler.handleError(err),
      );
    });
  }
  onDeleteUserClick() {
    const dialogAnchor = this.dialog.open(SureDialogComponentComponent, {
      data: {
        title: 'You are deleting user',
        message: 'Are you sure you want to delete this user?',
      },
    });
    dialogAnchor.afterClosed().subscribe((e) => {
      if (!e) return;
      let deletePath =
        GlobalVariables.GlobalServerPath +
        GlobalVariables.UsersPath +
        this.user.userId;
      this.response$ = this.http.delete(deletePath, { headers: this.headers });
      this.subscription = this.response$.subscribe(
        (res) => {
          console.log(res);
          this.delete.emit(this.user.userId);
          this.subscription.unsubscribe();
        },
        (err) => this.errorHandler.handleError(err),
      );
    });
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
