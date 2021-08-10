import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from 'src/app/globals';

@Component({
  selector: 'app-guests-panel',
  templateUrl: './guests-panel.component.html',
  styleUrls: ['./guests-panel.component.scss'],
})
export class GuestsPanelComponent implements OnInit {
  response$ = new Observable<any>();
  subscription = new Subscription();

  dataFetched = false;

  guests: {
    guestId: number;
    guestEmail: string;
  }[] = [];

  constructor(private http: HttpClient) {
    this.response$ = this.http.get(
      GlobalVariables.GlobalServerPath + '/guests',
    );
  }

  onGuestDelete(guestId: number) {
    this.guests = this.guests.filter((el) => el.guestId != guestId);
  }

  ngOnInit(): void {
    this.subscription = this.response$.subscribe((res) => {
      console.log(res);
      this.guests = res;
      this.dataFetched = true;
      this.subscription.unsubscribe();
    });
  }
}
