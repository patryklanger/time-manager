import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  Validators,
  NgForm,
  FormGroupDirective,
} from '@angular/forms';

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
  selector: 'app-modal-text-insertion',
  templateUrl: './modal-text-insertion.component.html',
  styleUrls: ['./modal-text-insertion.component.scss'],
})
export class ModalTextInsertionComponent implements OnInit {
  @Input() inputValue = '';
  @Input() type = 'text';
  @Input() name = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() button = 'next';
  @Input() textArea = false;
  @Input() required = false;
  @Input() maxLength = -1;
  @Input() _textValue = '';
  @Input() minValue = 0;
  @Input() maxValue = 2147483647;
  @Output() value = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<boolean>();
  nextClicked = false;
  inputValidation = new FormControl(this._textValue, []);
  constructor() {}
  matcher = new MyErrorStateMatcher();

  continueClicked() {
    this.nextClicked = true;
    console.log(this.inputValidation.valid);
    if (this.inputValidation.valid) {
      this.value.emit(this.inputValidation.value);
      this.inputValidation.setValue('');
      this.nextClicked = false;
    }
  }
  onCancelClicked() {
    this.cancel.emit(false);
  }
  ngOnInit(): void {
    this.inputValidation.setValue(this._textValue);
    let validatorsTab = [];
    validatorsTab.push(Validators.min(this.minValue));
    validatorsTab.push(Validators.max(this.maxValue));
    if (this.required) validatorsTab.push(Validators.required);
    if (this.maxLength > 0)
      validatorsTab.push(Validators.maxLength(this.maxLength));
    this.inputValidation.setValidators(validatorsTab);
  }
}
