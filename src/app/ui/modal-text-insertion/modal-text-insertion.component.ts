import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  @Output() value = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<boolean>();
  nextClicked = false;
  formValidator: FormGroup;
  constructor(private fb: FormBuilder) {
    this.formValidator = this.fb.group({
      inputValidation: new FormControl(this._textValue, []),
    });
  }
  continueClicked() {
    this.nextClicked = true;
    if (this.formValidator.get('inputValidation')?.valid) {
      this.value.emit(this.formValidator.get('inputValidation')?.value);
      this.formValidator.get('inputValidation')?.setValue('');
      this.nextClicked = false;
    }
  }
  onCancelClicked() {
    this.cancel.emit(false);
  }
  ngOnInit(): void {
    console.log(this.required);
    let validatorsTab = [];
    if (this.required) validatorsTab.push(Validators.required);
    if (this.maxLength > 0)
      validatorsTab.push(Validators.maxLength(this.maxLength));
    this.formValidator.get('inputValidation')?.setValidators(validatorsTab);
  }
}
