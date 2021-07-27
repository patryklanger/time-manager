import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import * as GlobalVariables from '../../globals';

@Component({
  selector: 'app-add-members-modal',
  templateUrl: './add-members-modal.component.html',
  styleUrls: ['./add-members-modal.component.scss'],
})
export class AddMembersModalComponent implements OnInit {
  textareaContent = '';
  addCustomEmailAddress = {
    add: false,
    address: '',
  };
  showCustomEmailAddressAdditionOption = false;
  showContextMenu = false;
  headers = new HttpHeaders();
  path = GlobalVariables.GlobalServerPath;
  subscription = new Subscription();
  response$ = new Observable<any>();
  addedUsers = [''];
  userArray = [''];
  emailValidityCheck: FormGroup;
  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.emailValidityCheck = this.fb.group({
      emailValidity: new FormControl('', [Validators.email]),
    });
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Accept', 'application/json');
  }
  keyDownOnTextarea() {
    this.userArray.filter((e) => !this.addedUsers.includes(e));
    this.textareaContent = this.emailValidityCheck.get('emailValidity')?.value;

    if (this.userArray[0] != '') this.showContextMenu = true;
    if (
      !(this.textareaContent == '') &&
      !this.userArray.includes(this.textareaContent)
    )
      this.showCustomEmailAddressAdditionOption = true;
    else this.showCustomEmailAddressAdditionOption = false;
    this.response$ = this.http.get(
      this.path + '/findUserByEmail?substring=' + this.textareaContent,
    );
    this.subscription = this.response$.subscribe(
      (res) => {
        this.userArray = res;
        console.log(res);
      },
      (err) => console.log(err.error),
    );
  }
  onEmailOnContextClicked(event: any) {
    if (this.addedUsers[0] == '') this.addedUsers = event.target.innerText;
    else this.addedUsers.push(event.target.innerText);
    console.log(this.addedUsers);
  }
  ngOnInit(): void {}
}
