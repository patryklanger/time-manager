import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-dialog-box-message',
  templateUrl: './dialog-box-message.component.html',
  styleUrls: ['./dialog-box-message.component.scss'],
})
export class DialogBoxMessageComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string },
  ) {}

  ngOnInit(): void {}
}
