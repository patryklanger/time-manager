import { decimalDigest } from '@angular/compiler/src/i18n/digest';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
})
export class TaskCardComponent implements OnInit {
  // @Input() bucket = '';
  // @Input() taskName = '';
  // @Input() deadline = '';
  // @Input() state = '';
  // @Input() timeleft = '';
  // @Input() editors = '';
  // @Input() author = '';
  // @Input() maxTasksAmount = '';
  // @Input() priority = '';
  timeleft = '';
  color = '';
  showDetails = false;
  @Input() managerTask = {
    taskId: 0,
    bucketName: '',
    taskName: '',
    taskPriority: 0,
    taskDeadline: '',
    taskState: '',
    taskEditorsCount: 0,
    taskOwner: '',
  };
  @Input() task = {
    taskId: 0,
    bucketName: '',
    taskName: '',
    creationTime: '',
    taskPriority: 0,
    taskDeadline: '',
    estDuration: '',
    taskOwner: '',
  };

  @Input() managerCard = true;
  normalCard = false;

  priorityColor = {
    low: '#1F9C00',
    medium: '#BABD10',
    high: '#B52920',
  };
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.listen('window', 'click', (e: Event) => {
      let menu =
        elementRef.nativeElement.getElementsByClassName('options--menu');
      let toggle =
        elementRef.nativeElement.getElementsByClassName('details--toggle');
      let toggleImg = elementRef.nativeElement.getElementsByClassName(
        'details--toggle--img'
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
      if (this.managerTask.taskPriority == 1)
        this.color = this.priorityColor.low;
      else if (this.managerTask.taskPriority == 2)
        this.color = this.priorityColor.medium;
      else this.color = this.priorityColor.high;
    } else {
      if (this.task.taskPriority == 1) this.color = this.priorityColor.low;
      else if (this.task.taskPriority == 2)
        this.color = this.priorityColor.medium;
      else this.color = this.priorityColor.high;
    }
  }
  onDetailsClicked() {
    this.showDetails = !this.showDetails;
  }
  ngOnInit(): void {
    this.normalCard = !this.managerCard;
    this.getColor();
    if (this.managerCard) this.timeleft = this.managerTask.taskDeadline;
    else this.timeleft = this.task.taskDeadline;
  }
}
