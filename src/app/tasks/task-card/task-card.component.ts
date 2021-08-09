import { trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  color = '';
  @Output() delete = new EventEmitter<number>();

  timerResponse$ = new Observable<any>();
  timerSubscription = new Subscription();

  startTimerResponse$ = new Observable<any>();
  startTimerSubscription = new Subscription();

  deleteTaskResponse$ = new Observable<any>();
  deleteTaskSubscription = new Subscription();

  getUsersResponse$ = new Observable<any>();
  getUsersSubscription = new Subscription();

  addUsersResponse$ = new Observable<any>();
  addUsersSubscription = new Subscription();

  subscribeMailsResponse$ = new Observable<any>();
  subscribeMailsSubscription = new Subscription();

  changeStateResponse$ = new Observable<any>();
  changeStateSubscription = new Subscription();

  showEditTask = false;
  showDetails = false;
  showAddMembers = false;
  isSuspended = false;
  isFinished = false;

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
  creationTimeDate = new Date();
  time = new Date();
  members: string[] = [];

  playPauseAvaiable = true;
  stopAvaiable = true;

  @Input() managerCard = true;
  normalCard = false;

  priorityColor = {
    low: '#1F9C00',
    medium: '#BABD10',
    high: '#B52920',
  };
  constructor(private http: HttpClient, private router: Router) {}
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
    if (this.task.timerState !== null && this.task.timerState !== 'NaN') {
      this.startTimerResponse$ = this.http.patch(
        GlobalVariables.GlobalServerPath +
          GlobalVariables.TasksPath +
          this.task.taskId +
          GlobalVariables.TimerPath +
          'toggle',
        null,
      );

      this.startTimerSubscription = this.startTimerResponse$.subscribe(
        (res) => {
          this.task.timerState = res.state;
          this.task.totalTimeOfTimer = res.totalTime;
          this.startTimerSubscription.unsubscribe();
          if (this.task.timerState == 'PAUSED') {
            this.turnOffTimer();
          } else {
            this.playPauseState = 'PAUSE';
          }
          this.updateTaskInfo();
        },
      );
    } else {
      this.startTimerResponse$ = this.http.post(
        GlobalVariables.GlobalServerPath +
          GlobalVariables.TasksPath +
          this.task.taskId +
          GlobalVariables.TimerPath,
        null,
      );
      this.startTimerSubscription = this.startTimerResponse$.subscribe(
        (res) => {
          this.task.taskState = 'IN_PROGRESS';
          this.task.timerState = res.state;
          this.task.totalTimeOfTimer = res.totalTime;
          this.updateTaskInfo();
          this.startTimerSubscription.unsubscribe();
        },
      );
    }
  }
  checkTimer() {
    if (this.task.timerState == 'IN_PROGRESS') {
      this.intervalId = window.setInterval(() => {
        this.increamentTimer();
      }, 1000);
      this.playPauseState = 'PAUSE';
    }
  }
  onShowTimersClick() {
    this.router.navigateByUrl('timers/tasks/' + this.task.taskId);
  }
  getTaskState() {
    if (this.task.taskState == 'NEW') {
      this.taskStateToDisplay = 'New';
      this.enablePlayStopButtons();
      this.isSuspended = false;
      this.isFinished = false;
    } else if (this.task.taskState == 'IN_PROGRESS') {
      this.taskStateToDisplay = 'In progress';
      this.isSuspended = false;
      this.isFinished = false;
      this.enablePlayStopButtons();
    } else if (this.task.taskState == 'SUSPENDED') {
      this.taskStateToDisplay = 'Suspended';
      this.isSuspended = true;
      this.isFinished = false;
      this.disablePlayStopButtons();
    } else if (this.task.taskState == 'FINISHED') {
      this.taskStateToDisplay = 'Finished';
      this.isSuspended = false;
      this.isFinished = true;
      this.disablePlayStopButtons();
    } else {
      this.taskStateToDisplay = 'Unknown';
      this.disablePlayStopButtons();
    }
  }
  turnOffTimer() {
    this.playPauseState = 'PLAY';
    clearInterval(this.intervalId);
    this.intervalId = -1;
  }
  disablePlayStopButtons() {
    this.playPauseAvaiable = false;
    this.stopAvaiable = false;
  }
  enablePlayStopButtons() {
    this.playPauseAvaiable = true;
    this.stopAvaiable = true;
  }
  stopTimer() {
    this.task.totalTimeOfTimer = 0;
    this.task.timerState = 'NaN';
    this.turnOffTimer();
    this.timerResponse$ = this.http.patch(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId +
        GlobalVariables.TimerPath +
        'stop',
      null,
    );
    this.timerSubscription = this.timerResponse$.subscribe((res) => {
      this.timerSubscription.unsubscribe();
    });
  }
  onEditUsersClick() {
    this.getUsersResponse$ = this.http.get(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId +
        '/shares',
    );
    this.getUsersSubscription = this.getUsersResponse$.subscribe((res) => {
      this.members = res;
      this.showAddMembers = true;
    });
  }
  onEditTaskClose() {
    this.showEditTask = false;
  }
  onDeleteTaskClick() {
    this.deleteTaskResponse$ = this.http.delete(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId,
    );
    this.deleteTaskSubscription = this.deleteTaskResponse$.subscribe((res) => {
      this.deleteTaskSubscription.unsubscribe();
    });
    this.delete.emit(this.task.taskId);
  }
  onShowMembersClick() {
    this.onEditUsersClick();
  }
  onShowMembersClose() {
    this.showAddMembers = false;
  }
  onShowDetailsToggle() {
    this.showDetails = !this.showDetails;
  }
  onMembersChanged(members: any) {
    const userIdArray: number[] = [];
    members.UserInDB.forEach(
      (e: {
        email: string;
        firstName: string;
        lastName: string;
        position: string;
        role: string;
        userId: number;
        userName: string;
      }) => {
        userIdArray.push(e.userId);
      },
    );
    this.addUsersResponse$ = this.http.post(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId +
        '/shares',
      userIdArray,
    );
    this.addUsersSubscription = this.addUsersResponse$.subscribe((res) => {
      this.addUsersSubscription.unsubscribe();
    });
    let usersToSubscribe: string[] = [];
    usersToSubscribe = members.UserNoInDB;
    this.subscribeMailsResponse$ = this.http.post(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId +
        '/subscriptions',
      usersToSubscribe,
    );
    this.subscribeMailsSubscription = this.subscribeMailsResponse$.subscribe(
      (res) => {
        this.subscribeMailsSubscription.unsubscribe();
      },
    );
    this.showAddMembers = false;
  }
  onSuspendClick() {
    this.changeStateResponse$ = this.http.patch(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId,
      'SUSPENDED',
    );
    this.changeStateSubscription = this.changeStateResponse$.subscribe(
      (res) => {
        // const newTask = res;
        // this.task = newTask;
        this.task = { ...res };
        this.turnOffTimer();
        this.updateTaskInfo();
        this.changeStateSubscription.unsubscribe();
      },
    );
  }
  onUnsuspendClick() {
    this.changeStateResponse$ = this.http.patch(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId,
      'IN_PROGRESS',
    );
    this.changeStateSubscription = this.changeStateResponse$.subscribe(
      (res) => {
        this.task = { ...res };
        this.turnOffTimer();
        this.updateTaskInfo();
        this.changeStateSubscription.unsubscribe();
      },
    );
  }
  onFinishClick() {
    this.changeStateResponse$ = this.http.patch(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId,
      'FINISHED',
    );
    this.changeStateSubscription = this.changeStateResponse$.subscribe(
      (res) => {
        // const newTask = res;
        this.task = { ...res };
        this.turnOffTimer();
        this.updateTaskInfo();
        this.changeStateSubscription.unsubscribe();
      },
    );
  }
  updateTaskInfo() {
    this.normalCard = !this.managerCard;
    this.creationTimeDate = new Date(this.task.taskCreationTime);
    this.getTaskState();
    this.checkTimer();
    this.timeConversion();
    this.getColor();
  }
  ngOnInit(): void {
    console.log(this.task.totalTimeOfTimer);
    this.updateTaskInfo();
    console.log('do it');
  }
  ngOnDestroy() {}
}
