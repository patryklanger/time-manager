import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';
import { MatDialog } from '@angular/material/dialog';
import { SureDialogComponentComponent } from 'src/app/ui/sure-dialog-component/sure-dialog-component.component';

@Component({
  selector: 'app-guest-card',
  templateUrl: './guest-card.component.html',
  styleUrls: ['./guest-card.component.scss'],
})
export class GuestCardComponent implements OnInit {
  color = '#727272';

  response$ = new Observable<any>();
  subscription = new Subscription();

  @Output() delete = new EventEmitter<number>();

  @Input() guest: {
    guestId: number;
    guestEmail: string;
  } = {
    guestId: -1,
    guestEmail: '',
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
  ) {}
  onLogsClick() {
    this.router.navigateByUrl('admin-panel/logs/guests/' + this.guest.guestId);
  }
  onSubsClick() {
    this.router.navigateByUrl(
      'admin-panel/subscriptions/guest/' + this.guest.guestId,
    );
  }
  onDeleteClick() {
    this.response$ = this.http.delete(
      GlobalVariables.GlobalServerPath + '/guests/' + this.guest.guestId,
    );
    const dialogAnchor = this.dialog.open(SureDialogComponentComponent, {
      data: {
        title: 'Deleting guest',
        message: 'Are you sure you want to delete this guest?',
      },
    });
    dialogAnchor.afterClosed().subscribe((e) => {
      if (!e) return;
      this.subscription = this.response$.subscribe((res) => {
        this.delete.emit(this.guest.guestId);
        this.subscription.unsubscribe();
      });
    });
  }

  ngOnInit(): void {}
}
