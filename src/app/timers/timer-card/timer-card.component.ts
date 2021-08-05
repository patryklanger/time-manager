import * as GlobalVariables from '../../globals';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer-card',
  templateUrl: './timer-card.component.html',
  styleUrls: ['./timer-card.component.scss'],
})
export class TimerCardComponent implements OnInit {
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

  @Output() delete = new EventEmitter<number>();

  color = '#727272';

  intervalId = -1;

  playPauseState = 'PLAY';
  timerStateToDisplay = '';

  isPlayed = false;
  isPaused = false;
  isStopped = false;

  playPauseResponse$ = new Observable<any>();
  playPauseSubscription = new Subscription();

  stopResponse$ = new Observable<any>();
  stopSubscription = new Subscription();

  deleteResponse$ = new Observable<any>();
  deleteSubscription = new Subscription();

  constructor(private http: HttpClient) {}
  setTimerState() {
    if (this.timer.state == 'NEW') {
      this.timerStateToDisplay = 'New';

      this.isPlayed = false;
      this.isPaused = false;
      this.isStopped = false;

      this.playPauseState = 'PLAY';

      clearInterval(this.intervalId);
      this.intervalId = -1;
    } else if (this.timer.state == 'PAUSED') {
      this.timerStateToDisplay = 'Paused';

      this.isPlayed = false;
      this.isPaused = true;
      this.isStopped = false;

      this.playPauseState = 'PLAY';

      clearInterval(this.intervalId);
      this.intervalId = -1;
    } else if (this.timer.state == 'IN_PROGRESS') {
      this.timerStateToDisplay = 'In progress';

      this.isPlayed = true;
      this.isPaused = false;
      this.isStopped = false;

      this.playPauseState = 'PAUSE';

      this.intervalId = window.setInterval(() => {
        this.timer.totalTime++;
      }, 1000);
    } else if (this.timer.state == 'FINISHED') {
      this.timerStateToDisplay = 'Finished';

      this.isPlayed = false;
      this.isPaused = false;
      this.isStopped = true;

      this.playPauseState = 'PLAY';

      clearInterval(this.intervalId);
      this.intervalId = -1;
    } else {
      this.timerStateToDisplay == 'Unknown';

      this.isPlayed = false;
      this.isPaused = false;
      this.isStopped = false;

      clearInterval(this.intervalId);
      this.intervalId = -1;
    }
  }
  onDeleteClick() {
    this.deleteResponse$ = this.http.delete(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TimerPath +
        this.timer.timerId,
    );
    this.deleteSubscription = this.deleteResponse$.subscribe((res) => {
      console.log(res);
      this.deleteSubscription.unsubscribe();
      this.delete.emit(this.timer.timerId);
    });
  }
  onPlayPauseClicked() {
    this.playPauseResponse$ = this.http.patch(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TimerPath +
        this.timer.timerId +
        '/toggle',
      null,
    );
    this.playPauseSubscription = this.playPauseResponse$.subscribe((res) => {
      console.log(res);
      this.playPauseSubscription.unsubscribe();
      if (this.intervalId == -1) {
        this.timer.state = 'IN_PROGRESS';
      } else {
        this.timer.state = 'PAUSED';
      }
      this.setTimerState();
    });
  }
  onStopTimerClick() {
    this.stopResponse$ = this.http.patch(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TimerPath +
        this.timer.timerId +
        '/stop',
      null,
    );
    this.stopSubscription = this.stopResponse$.subscribe((res) => {
      console.log(res);
      this.stopSubscription.unsubscribe();
      this.timer.state = 'FINISHED';
      this.setTimerState();
    });
  }

  ngOnInit(): void {
    this.setTimerState();
    console.log(this.timer);
  }
}
