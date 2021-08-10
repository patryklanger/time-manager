import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/utility/MyErrorStateMatcher';

@Component({
  selector: 'app-edit-total-time',
  templateUrl: './edit-total-time.component.html',
  styleUrls: ['./edit-total-time.component.scss'],
})
export class EditTotalTimeComponent implements OnInit {
  @Input() totalTime = 0;

  @Output() changed = new EventEmitter<number>();
  @Output() close = new EventEmitter();

  inputValidation = new FormControl(0, [
    Validators.required,
    Validators.min(0),
  ]);
  matcher = new MyErrorStateMatcher();
  constructor() {}

  onSubmitClick() {
    if (!this.inputValidation.valid) return;
    this.changed.emit(this.inputValidation.value);
  }
  onCancelClick() {
    this.close.emit();
  }

  ngOnInit(): void {
    this.inputValidation.setValue(this.totalTime);
  }
}
