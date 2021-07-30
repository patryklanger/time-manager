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

  showDetails = false;
  @Input() task = {
    taskId: 0,
    bucketName: '',
    taskName: '',
    owner: '',
    taskPriority: 0,
    taskDeadline: '',
    taskState: '',
    taskCreationTime: '',
    taskExpectedTime: -1,
    editorsCount: -1,
  };
  taskStateToDisplay = '';
  deadline = '';
  startTime = '';
  timeLeft = '';
  timerTime = 0;

  @Input() managerCard = true;
  normalCard = false;

  priorityColor = {
    low: '#1F9C00',
    medium: '#BABD10',
    high: '#B52920',
  };
  constructor(private renderer: Renderer2, private http: HttpClient) {}
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
  formatTime(time: Date): string {
    let hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    let minutes =
      time.getMinutes() < 10
        ? ':0' + time.getMinutes()
        : ':' + time.getMinutes();
    let day =
      time.getDate() < 10 ? ', 0' + time.getDate() : ', ' + time.getDate();
    let month =
      time.getMonth() < 10 ? '.0' + time.getMonth() : '.' + time.getMonth();
    return hours + minutes + day + month + '.' + time.getFullYear();
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
    this.deadline = this.formatTime(time);
    var now = new Date();

    this.timeLeft = this.substractDates(time, now);

    if (!this.managerCard) time = new Date(this.task.taskCreationTime);
    else time = new Date(this.task.taskCreationTime);
    this.startTime = this.formatTime(time);
  }
  onDetailsClicked() {
    this.showDetails = !this.showDetails;
  }
  startTimer() {
    this.timerResponse$ = this.http.post(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId +
        GlobalVariables.TimerPath,
      null,
    );
    this.startTimerSubscription = this.timerResponse$.subscribe((res) => {
      console.log(res);
      this.startTimerSubscription.unsubscribe();
      setInterval(() => {
        this.timerTime++;
        console.log(this.timerTime);
      }, 1000);
    });
  }
  getTimer() {
    this.timerResponse$ = this.http.get(
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
  ngOnInit(): void {
    if (this.task.taskState == 'NEW') this.taskStateToDisplay = 'New';
    else if (this.task.taskState == 'IN_PROGRESS')
      this.taskStateToDisplay = 'In progress';
    else if (this.task.taskState == 'SUSPENDED')
      this.taskStateToDisplay = 'Suspended';
    else this.taskStateToDisplay = 'Finished';
    this.timeConversion();
    this.normalCard = !this.managerCard;
    this.getColor();
    this.getTimer();
  }
  ngOnDestroy() {}
}
