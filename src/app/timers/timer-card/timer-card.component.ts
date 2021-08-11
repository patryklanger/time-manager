import * as GlobalVariables from '../../globals';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-timer-card',
  templateUrl: './timer-card.component.html',
  styleUrls: ['./timer-card.component.scss'],
})
export class TimerCardComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  editTotalTimeShow = false;

  @Input() timer: {
    timerId: number;
    userFullName: string;
    taskName: string;
    totalTime: number;
    state: string;
  } = {
    timerId: -1,
    userFullName: '',
    taskName: '',
    totalTime: -1,
    state: '',
  };

  @Input() isAdmin = false;

  @Output() delete = new EventEmitter<number>();

  color = '#727272';

  intervalId = -1;

  playPauseState = 'PLAY';
  timerStateToDisplay = '';

  isPlayed = false;
  isPaused = false;
  isStopped = false;
  isFinished = false;

  playPauseResponse$ = new Observable<any>();
  playPauseSubscription = new Subscription();

  stopResponse$ = new Observable<any>();
  stopSubscription = new Subscription();

  editTotalTimeResponse$ = new Observable<any>();
  editTotalTimeSubscription = new Subscription();

  deleteResponse$ = new Observable<any>();
  deleteSubscription = new Subscription();

  constructor(private http: HttpClient, private dialog: MatDialog) {}
  setTimerState() {
    if (this.timer.state == 'NEW') {
      this.timerStateToDisplay = 'New';

      this.isPlayed = false;
      this.isPaused = false;
      this.isStopped = false;
      this.isFinished = false;

      this.playPauseState = 'PLAY';

      clearInterval(this.intervalId);
      this.intervalId = -1;
    } else if (this.timer.state == 'PAUSED') {
      this.timerStateToDisplay = 'Paused';

      this.isPlayed = false;
      this.isPaused = true;
      this.isStopped = false;
      this.isFinished = false;

      this.playPauseState = 'PLAY';

      clearInterval(this.intervalId);
      this.intervalId = -1;
    } else if (this.timer.state == 'IN_PROGRESS') {
      this.timerStateToDisplay = 'In progress';

      this.isPlayed = true;
      this.isPaused = false;
      this.isStopped = false;
      this.isFinished = false;

      this.playPauseState = 'PAUSE';

      this.intervalId = window.setInterval(() => {
        this.timer.totalTime++;
      }, 1000);
    } else if (this.timer.state == 'FINISHED') {
      this.timerStateToDisplay = 'Finished';

      this.isPlayed = false;
      this.isPaused = false;
      this.isStopped = true;
      this.isFinished = true;

      this.playPauseState = 'PLAY';

      clearInterval(this.intervalId);
      this.intervalId = -1;
    } else {
      this.timerStateToDisplay == 'Unknown';

      this.isPlayed = false;
      this.isPaused = false;
      this.isStopped = false;
      this.isFinished = false;

      clearInterval(this.intervalId);
      this.intervalId = -1;
    }
  }

  onEditTotalTimeToggle() {
    this.editTotalTimeShow = !this.editTotalTimeShow;
  }
  onTotalTimeChange(newTotalTime: number) {
    let params = new HttpParams();
    params = params.append('totalTime', newTotalTime);
    this.editTotalTimeResponse$ = this.http.put(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TimerPath +
        this.timer.timerId,
      params,
    );

    this.playPauseSubscription = this.editTotalTimeResponse$.subscribe(
      (res) => {
        console.log(res);
        this.timer.totalTime = newTotalTime;
        this.playPauseSubscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
    this.onEditTotalTimeToggle();
  }

  onDeleteClick() {
    this.deleteResponse$ = this.http.delete(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TimerPath +
        this.timer.timerId,
    );
    this.deleteSubscription = this.deleteResponse$.subscribe(
      (res) => {
        console.log(res);
        this.delete.emit(this.timer.timerId);
        this.deleteSubscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
  }
  onPlayPauseClicked() {
    this.playPauseResponse$ = this.http.patch(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TimerPath +
        this.timer.timerId +
        '/toggle',
      null,
    );
    this.playPauseSubscription = this.playPauseResponse$.subscribe(
      (res) => {
        if (this.intervalId == -1) {
          this.timer.state = 'IN_PROGRESS';
        } else {
          this.timer.state = 'PAUSED';
        }
        this.setTimerState();
        this.playPauseSubscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
  }
  onStopTimerClick() {
    this.stopResponse$ = this.http.patch(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TimerPath +
        this.timer.timerId +
        '/stop',
      null,
    );
    this.stopSubscription = this.stopResponse$.subscribe(
      (res) => {
        console.log(res);
        this.timer.state = 'FINISHED';
        this.setTimerState();
        this.stopSubscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
  }

  ngOnInit(): void {
    this.setTimerState();
  }
  ngOnDestroy() {
    this.editTotalTimeSubscription.unsubscribe();
    this.playPauseSubscription.unsubscribe();
    this.stopSubscription.unsubscribe();
    this.deleteSubscription.unsubscribe();
  }
}
