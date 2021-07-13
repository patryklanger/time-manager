import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-bucket',
  templateUrl: './add-bucket.component.html',
  styleUrls: ['./add-bucket.component.scss'],
})
export class AddBucketComponent implements OnInit {
  @Output() closeEmitter = new EventEmitter<boolean>();
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
    this.newBucket.name = description;
    this.modals.description = false;
    this.modals.maxTask = true;
  }
  onMaxTaskAdded(maxTask: string) {
    this.newBucket.maxTask = maxTask;
    this.modals.maxTask = false;
    this.modals.team = true;
  }
  onMembersAdded(members: string) {
    this.onSuccessfullyAdded();
  }
  onCancelClick() {
    this.modals.name = true;
    this.modals.description = false;
    this.modals.maxTask = false;
    this.modals.team = false;
    this.closeEmitter.emit(false);
  }
  onSuccessfullyAdded() {
    this.modals.name = true;
    this.modals.description = false;
    this.modals.maxTask = false;
    this.modals.team = false;
    this.closeEmitter.emit(true);
  }
  ngOnInit(): void {}
}
