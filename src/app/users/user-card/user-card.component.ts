import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as GlobalVariables from '../../globals';
import { Observable, Subscription } from 'rxjs';
import { SureDialogComponentComponent } from 'src/app/ui/sure-dialog-component/sure-dialog-component.component';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  showEditProfile = false;
  dataFetched = false;
  color = '#727272';

  response$ = new Observable<any>();
  subscription = new Subscription();

  headers = new HttpHeaders();

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
  constructor(private http: HttpClient, private dialog: MatDialog) {
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
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
          console.log(res);
          this.delete.emit(this.user.userId);
          this.subscription.unsubscribe();
        },
        (err) => {
          console.log(err);
          this.subscription.unsubscribe();
        },
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
        (err) => {
          console.log(err);
          this.subscription.unsubscribe();
        },
      );
    });
  }

  ngOnInit(): void {}
}
