import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  color = '';

  timerResponse$ = new Observable<any>();
  timerSubscription = new Subscription();

  startTimerResponse$ = new Observable<any>();
  startTimerSubscription = new Subscription();

  showEditTask = false;

  showDetails = false;
  @Input() task: {
    taskId: number;
    bucketName: string;
    taskName: string;
    taskDescription: string;
    taskPriority: number;
    taskExpectedTime: number;
    taskDeadline: string;
    taskCreationTime: string;
    owner: string;
    taskState: string;
    editorsCount: number;
    totalTimeOfTimer: number;
    timerState?: string;
  } = {
    taskId: 0,
    bucketName: '',
    taskName: '',
    taskDescription: '',
    taskPriority: 0,
    taskExpectedTime: -1,
    taskDeadline: '',
    taskCreationTime: '',
    owner: '',
    taskState: '',
    editorsCount: -1,
    totalTimeOfTimer: -1,
    timerState: '',
  };
  taskStateToDisplay = '';
  deadline = new Date();
  intervalId = -1;
  startTime = '';
  timeLeft = '';
  playPauseState = 'PLAY';
  time = new Date();

  @Input() managerCard = true;
  normalCard = false;

  priorityColor = {
    low: '#1F9C00',
    medium: '#BABD10',
    high: '#B52920',
  };
  constructor(private renderer: Renderer2, private http: HttpClient) {
    clearInterval(this.intervalId);
  }
  getColor() {
    if (this.managerCard) {
      if (this.task.taskPriority == 1) this.color = this.priorityColor.low;
      else if (this.task.taskPriority == 2)
        this.color = this.priorityColor.medium;
      else this.color = this.priorityColor.high;
    } else {
      if (this.task.taskPriority == 1) this.color = this.priorityColor.low;
      else if (this.task.taskPriority == 2)
        this.color = this.priorityColor.medium;
      else this.color = this.priorityColor.high;
    }
  }
  substractDates(dat1: Date, dat2: Date): string {
    let differance = dat1.getTime() - dat2.getTime();
    if (differance < 0) return 'No time left';
    let day = Math.floor(differance / (60 * 60 * 24 * 1000));
    differance -= day * (60 * 60 * 24 * 1000);
    let hours = Math.floor(differance / (60 * 60 * 1000));
    differance -= hours * 3600 * 1000;
    let minutes = Math.floor(differance / (60 * 1000));

    var dDisplay = day > 0 ? day + (day == 1 ? ' day, ' : ' days, ') : '';
    var hDisplay =
      hours > 0 ? hours + (hours == 1 ? ' hour, ' : ' hours, ') : '';
    var mDisplay =
      minutes > 0 ? minutes + (minutes == 1 ? ' minute, ' : ' minutes') : '';

    return dDisplay + hDisplay + mDisplay;
  }

  timeConversion() {
    if (!this.managerCard) var time = new Date(this.task.taskDeadline);
    else var time = new Date(this.task.taskDeadline);
    this.deadline = time;
    var now = new Date();

    this.timeLeft = this.substractDates(time, now);

    if (!this.managerCard) this.time = new Date(this.task.taskCreationTime);
    else this.time = new Date(this.task.taskCreationTime);
  }
  increamentTimer() {
    this.task.totalTimeOfTimer++;
  }
  onTaskEditted(task: any) {
    console.log(task);
    this.task = task;
    this.getTaskState();
    this.checkTimer();
    this.timeConversion();
    this.getColor();
    this.showEditTask = false;
  }
  onEditTaskClick() {
    this.showEditTask = true;
  }
  startTimer() {
    if (this.task.timerState !== null || this.task.timerState === 'NaN') {
      this.startTimerResponse$ = this.http.patch(
        GlobalVariables.GlobalServerPath +
          GlobalVariables.TasksPath +
          this.task.taskId +
          GlobalVariables.TimerPath,
        null,
      );

      this.startTimerSubscription = this.startTimerResponse$.subscribe(
        (res) => {
          console.log(res);
          this.startTimerSubscription.unsubscribe();
        },
      );
    } else {
      console.log('start timer');
      this.startTimerResponse$ = this.http.post(
        GlobalVariables.GlobalServerPath +
          GlobalVariables.TasksPath +
          this.task.taskId +
          GlobalVariables.TimerPath,
        null,
      );
      this.startTimerSubscription = this.startTimerResponse$.subscribe(
        (res) => {
          console.log(res);

          this.startTimerSubscription.unsubscribe();
        },
      );
    }

    if (this.intervalId != -1) {
      clearInterval(this.intervalId);
      this.intervalId = -1;
      this.playPauseState = 'PLAY';
    } else {
      this.intervalId = window.setInterval(() => {
        this.increamentTimer();
      }, 1000);
      this.playPauseState = 'PAUSE';
    }
  }
  checkTimer() {
    if (this.task.timerState == 'IN_PROGRESS') {
      console.log('IN PROGRESS');
      this.intervalId = window.setInterval(() => {
        this.increamentTimer();
      }, 1000);
      this.playPauseState = 'PAUSE';
    }
  }
  getTaskState() {
    if (this.task.taskState == 'NEW') this.taskStateToDisplay = 'New';
    else if (this.task.taskState == 'IN_PROGRESS')
      this.taskStateToDisplay = 'In progress';
    else if (this.task.taskState == 'SUSPENDED')
      this.taskStateToDisplay = 'Suspended';
    else this.taskStateToDisplay = 'Finished';
  }
  stopTimer() {
    this.task.totalTimeOfTimer = 0;
    this.task.timerState = 'NaN';
    this.timerResponse$ = this.http.delete(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId +
        GlobalVariables.TimerPath,
    );
    this.timerSubscription = this.timerResponse$.subscribe((res) => {
      console.log(res);
      this.timerSubscription.unsubscribe();
    });
  }
  onEditTaskClose() {
    this.showEditTask = false;
  }
  ngOnInit(): void {
    console.log(this.task.timerState === null);
    this.normalCard = !this.managerCard;
    this.getTaskState();
    this.checkTimer();
    this.timeConversion();
    this.getColor();
  }
  ngOnDestroy() {}
}
