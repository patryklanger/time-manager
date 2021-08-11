import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { DateToServerStringPipe } from 'src/app/pipes/date-to-server-string.pipe';
import { MyErrorHandler } from 'src/app/utility/error-handler';
import * as GlobalVariables from '../../globals';
import { MyErrorStateMatcher } from '../../utility/MyErrorStateMatcher';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  errorHandler = new MyErrorHandler(this.dialog);
  @Output() taskEditted = new EventEmitter<{
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
    timerState?: string | null | undefined;
  }>();
  @Output() close = new EventEmitter<boolean>();

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
    timerState?: string | null | undefined;
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
  minDeadlineDate = new Date();
  deadlineDate = new Date(this.task.taskDeadline);
  editResponse$ = new Observable<any>();
  subscription = new Subscription();
  maxTaskNameLength = GlobalVariables.maxTaskNameLength;
  maxTaskDescriptionLength = GlobalVariables.maxTaskDescriptionLength;

  matcher = new MyErrorStateMatcher();

  nameValidation = new FormControl(this.task.taskName, [
    Validators.required,
    Validators.maxLength(this.maxTaskNameLength),
  ]);
  descriptionValidation = new FormControl(this.task.taskDescription, [
    Validators.required,
    Validators.maxLength(this.maxTaskDescriptionLength),
  ]);

  taskDeadlineValidation = new FormControl('', [Validators.required]);

  priorityValidation = new FormControl('1');

  expectedTimeValidation = new FormControl('', [Validators.min(1)]);

  constructor(private http: HttpClient, private dialog: MatDialog) {}
  onSubmitEditing() {
    this.task.taskName = this.nameValidation.value;
    this.task.taskDescription = this.descriptionValidation.value;
    const dateToStringPipe = new DateToServerStringPipe();
    const deadline = new Date(this.taskDeadlineValidation.value);
    this.task.taskDeadline = dateToStringPipe.transform(deadline);
    this.task.taskPriority = Number(this.priorityValidation.value);
    this.task.taskExpectedTime = this.expectedTimeValidation.value;
    const editBucket = {
      taskName: this.task.taskName,
      taskDescription: this.task.taskDescription,
      taskPriority: this.task.taskPriority,
      taskExpectedTime: this.task.taskExpectedTime,
      taskDeadline: this.task.taskDeadline,
    };
    this.editResponse$ = this.http.put(
      GlobalVariables.GlobalServerPath +
        GlobalVariables.TasksPath +
        this.task.taskId,
      editBucket,
    );
    this.subscription = this.editResponse$.subscribe(
      (res) => {
        console.log(res);
        this.subscription.unsubscribe();
      },
      (err) => this.errorHandler.handleError(err),
    );
    this.taskEditted.emit(this.task);
  }
  onCancelClick() {
    this.close.emit(true);
  }
  setValidatorsValues() {
    this.nameValidation.setValue(this.task.taskName);
    this.descriptionValidation.setValue(this.task.taskDescription);

    this.deadlineDate = new Date(this.task.taskDeadline);
    this.taskDeadlineValidation.setValue(moment(this.deadlineDate));
    this.priorityValidation.setValue(this.task.taskPriority.toString());
    this.expectedTimeValidation.setValue(this.task.taskExpectedTime);
  }

  ngOnInit(): void {
    this.setValidatorsValues();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
