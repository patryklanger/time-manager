import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

import { ErrorStateMatcher } from '@angular/material/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Output() closeEmitter = new EventEmitter<boolean>();
  @Input() bucketId = -1;
  today = new Date();
  modals = {
    name: true,
    description: false,
    priority: false,
    deadline: false,
    estDuration: false,
    team: false,
  };
  deadline = '';
  newTask = {
    taskName: '',
    taskDescription: '',
    taskExpectedTime: '',
    taskDeadline: '',
    taskPriority: '',
  };
  dateValidation = new FormControl('', [Validators.required]);
  priorityValidation = new FormControl('1', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  dataFetched = false;
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  constructor(private http: HttpClient) {
    this.headers = this.headers.append('Content-Type', 'appliaction/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }
  onNameAdded(name: string) {
    this.newTask.taskName = name;
    this.modals.name = false;
    this.modals.description = true;
  }
  onDescriptionAdded(des: string) {
    this.newTask.taskDescription = des;
    this.modals.description = false;
    this.modals.estDuration = true;
  }
  onEstDurAdded(time: string) {
    this.newTask.taskExpectedTime = time;
    this.modals.estDuration = false;
    this.modals.deadline = true;
  }
  onDeadlineAdded() {
    this.modals.deadline = false;
    this.modals.priority = true;
    let deadline = new Date(this.dateValidation.value);
    let date = [deadline.getFullYear()];
    date.push(deadline.getMonth() + 1);
    date.push(deadline.getDate());
    date.push(deadline.getHours());
    date.push(deadline.getMinutes());
    date.push(deadline.getSeconds());
    let timeString: string;
    timeString = '' + date[0];
    if (date[1] < 10) timeString += '-0' + date[1];
    else timeString += '-' + date[1].toString();
    if (date[2] < 10) timeString += '-0' + date[2];
    else timeString += '-' + date[2].toString() + 'T';
    if (date[3] < 10) timeString += '0' + date[3];
    else timeString += date[3].toString();
    if (date[4] < 10) timeString += ':0' + date[4];
    else timeString += ':' + date[4];
    if (date[5] < 10) timeString += ':0' + date[5];
    else timeString += ':' + date[5];
    console.log(timeString);
    this.newTask.taskDeadline = timeString;
  }
  onPriorityAdded() {
    this.modals.priority = false;
    this.newTask.taskPriority = this.priorityValidation.value;
    this.onSuccesfullyTaskAdded();
    console.log(this.newTask);
  }
  onSuccesfullyTaskAdded() {
    this.response$ = this.http.post(
      this.path + GlobalVariables.BucketsPath + this.bucketId,
      this.newTask,
    );
    this.subscription = this.response$.subscribe(
      (res) => {
        console.log(res);
        this.modals.name = true;
        this.closeEmitter.emit(true);
      },
      (err) => {
        console.log(err);
      },
    );
  }
  onCancelClick() {
    this.closeEmitter.emit(false);
  }
  ngOnInit(): void {}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
