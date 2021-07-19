import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-bucket',
  templateUrl: './edit-bucket.component.html',
  styleUrls: ['./edit-bucket.component.scss'],
})
export class EditBucketComponent implements OnInit {
  @Input() bucketId = '';
  @Output() close = new EventEmitter<boolean>();
  modals = {
    name: true,
    description: false,
    maxTask: false,
    team: false,
  };
  newBucket = {
    name: '',
    description: '',
    maxTask: '',
    team: [''],
  };
  constructor() {}
  onNameAdded(name: string) {
    this.newBucket.name = name;
    this.modals.name = false;
    this.modals.description = true;
  }
  onDescriptionAdded(description: string) {
    this.newBucket.description = description;
    this.modals.description = false;
    this.modals.maxTask = true;
  }
  onMaxTaskAdded(maxTask: string) {
    this.newBucket.maxTask = maxTask;
    this.modals.maxTask = false;
    this.modals.team = true;
  }
  onMembersAdded(members: string) {
    const teamX = [''];
    teamX.push(members);
    this.newBucket.team = teamX;
    this.onSuccessfullyAdded();
  }
  onCancelClick() {
    this.modals.name = true;
    this.modals.description = false;
    this.modals.maxTask = false;
    this.modals.team = false;
    this.close.emit(false);
  }
  onSuccessfullyAdded() {
    console.log(this.newBucket);
    this.modals.name = true;
    this.modals.description = false;
    this.modals.maxTask = false;
    this.modals.team = false;
    this.close.emit(true);
    console.log(this.newBucket);
  }
  ngOnInit(): void {}
}
