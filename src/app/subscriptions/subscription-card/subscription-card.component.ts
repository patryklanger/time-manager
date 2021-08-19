import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';
import { SureDialogComponentComponent } from 'src/app/ui/sure-dialog-component/sure-dialog-component.component';

@Component({
  selector: 'app-subscription-card',
  templateUrl: './subscription-card.component.html',
  styleUrls: ['./subscription-card.component.scss'],
})
export class SubscriptionCardComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  color = '#727272';

  @Output() delete = new EventEmitter<number>();

  @Input() sub: {
    subscriptionId: number;
    bucketName: string;
    taskName: string;
    guestEmail: string;
    subscriptionTime: string;
  } = {
    subscriptionId: -1,
    bucketName: '',
    taskName: '',
    guestEmail: '',
    subscriptionTime: '',
  };

  subscriptionDate = new Date();

  deleteResponse$ = new Observable<any>();
  deleteSubscription = new Subscription();

  constructor(private http: HttpClient, private dialog: MatDialog) {}

  onSubDelete() {
    this.deleteResponse$ = this.http.delete(
      GlobalVariables.GlobalServerPath +
        '/subscriptions/' +
        this.sub.subscriptionId,
    );
    const dialogAnchor = this.dialog.open(SureDialogComponentComponent, {
      data: {
        title: 'Deleting subscription',
        message: 'Are you sure you want to delete this subscription',
      },
    });
    dialogAnchor.afterClosed().subscribe((e) => {
      if (!e) return;
      this.deleteSubscription = this.deleteResponse$.subscribe(
        (res) => {
          this.delete.emit(this.sub.subscriptionId);
          this.deleteSubscription.unsubscribe();
        },
        (err) => this.errorHandler.handleError(err),
      );
    });
  }

  ngOnInit(): void {
    this.subscriptionDate = new Date(this.sub.subscriptionTime);
  }
}
