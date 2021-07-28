import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  timeleft = '';
  color = '';
  response$ = new Observable<any>();
  subscription = new Subscription();
  showDetails = false;
  @Input() task = {
    taskId: 0,
    bucketName: '',
    taskName: '',
    owner: '',
    taskPriority: 0,
    taskDeadline: '',
    taskState: '',
    taskEditorsCount: 0,
    taskCreationTime: '',
    taskExpectedTime: -1,
    editorsCount: -1,
  };

  deadline = '';
  startTime = '';
  timeLeft = '';

  @Input() managerCard = true;
  normalCard = false;

  priorityColor = {
    low: '#1F9C00',
    medium: '#BABD10',
    high: '#B52920',
  };
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient,
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      let menu =
        elementRef.nativeElement.getElementsByClassName('options--menu');
      let toggle =
        elementRef.nativeElement.getElementsByClassName('details--toggle');
      let toggleImg = elementRef.nativeElement.getElementsByClassName(
        'details--toggle--img',
      );
      if (
        e.target !== menu[0] &&
        e.target !== toggle[0] &&
        e.target !== toggleImg[0]
      )
        this.showDetails = false;
    });
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
  formatTime(time: Date): string {
    return (
      time.getHours() +
      ':' +
      time.getMinutes() +
      ', ' +
      time.getDate() +
      '.' +
      (time.getMonth() + 1) +
      '.' +
      time.getFullYear()
    );
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
  getTimer() {
    // this.response$.get()
  }
  ngOnInit(): void {
    this.timeConversion();
    this.normalCard = !this.managerCard;
    this.getColor();
    if (this.managerCard) this.timeleft = this.task.taskDeadline;
    else this.timeleft = this.task.taskDeadline;
  }
  ngOnDestroy() {}
}
