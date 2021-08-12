import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

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

  constructor(private http: HttpClient, private router: Router) {}
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
    this.subscription = this.response$.subscribe((res) => {
      this.delete.emit(this.guest.guestId);
      this.subscription.unsubscribe();
    });
  }

  ngOnInit(): void {}
}
