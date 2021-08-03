import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utility/MyErrorStateMatcher';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';
import { DateToServerStringPipe } from 'src/app/pipes/date-to-server-string.pipe';

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
    const dateToStringPipe = new DateToServerStringPipe();
    this.newTask.taskDeadline = dateToStringPipe.transform(deadline);
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
