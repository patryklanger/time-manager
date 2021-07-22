import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  @Output() closeEmitter = new EventEmitter<boolean>();
  @Input() bucketId = -1;
  today = new Date();
  invalid = false;
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
    bucketId: -1,
    name: '',
    description: '',
    estDuration: '',
    deadline: '',
    priority: '',
    team: [''],
  };
  dataFetched = false;
  headers = new HttpHeaders();
  path = GlobalVariables.TasksPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  formValidator: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.headers = this.headers.append('Content-Type', 'appliaction/json');
    this.headers = this.headers.append('Accept', 'application/json');

    this.formValidator = this.fb.group({
      deadline: new FormControl('', [Validators.required]),
      priority: new FormControl('1'),
    });
  }
  onNameAdded(name: string) {
    this.newTask.name = name;
    this.modals.name = false;
    this.modals.description = true;
  }
  onDescriptionAdded(des: string) {
    this.newTask.description = des;
    this.modals.description = false;
    this.modals.estDuration = true;
  }
  onEstDurAdded(time: string) {
    this.newTask.estDuration = time;
    this.modals.estDuration = false;
    this.modals.deadline = true;
  }
  onDeadlineAdded() {
    if (this.formValidator.get('deadline')?.invalid) {
      this.invalid = true;
      return;
    }
    this.invalid = false;
    this.modals.deadline = false;
    this.modals.priority = true;
    let deadline = new Date(this.deadline);
    let time = [deadline.getHours()];
    time.push(deadline.getMinutes());
    time.push(deadline.getSeconds());
    let timeString: String;
    if (time[0] < 10) timeString = '0' + time[0];
    else timeString = time[0].toString();
    if (time[1] < 10) timeString += ':0' + time[1];
    else timeString += ':' + time[1];
    if (time[2] < 10) timeString += ':0' + time[2];
    else timeString += ':' + time[2];

    let timeMessage =
      deadline.getFullYear() +
      '-' +
      deadline.getMonth() +
      '-' +
      deadline.getDate() +
      'T' +
      timeString;
    this.newTask.deadline = timeMessage;
  }
  onPriorityAdded() {
    this.newTask.priority = this.formValidator.get('priority')?.value;
  }
  onCancelClick() {
    this.closeEmitter.emit(false);
  }
  ngOnInit(): void {}
}
