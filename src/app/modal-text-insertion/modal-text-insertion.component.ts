import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() _textValue = '';
  @Output() value = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<boolean>();
  constructor() {}
  onKey(event: any) {
    this.textValue = event.target.value;
  }
  get textValue(): string {
    return this._textValue;
  }
  set textValue(val: string) {
    this._textValue = val;
  }
  continueClicked() {
    if (this._textValue != '') {
      this.value.emit(this._textValue);
      this._textValue = '';
    }
  }
  onCancelClicked() {
    this.cancel.emit(false);
  }
  ngOnInit(): void {}
}
