import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelCardComponent } from './panel-card/panel-card.component';
import { UserPanelMainComponent } from './user-panel-main/user-panel-main.component';
import { HeaderComponent } from './header/header.component';
import { BucketsPanelComponent } from './buckets-panel/buckets-panel.component';
import { BucketCardComponent } from './bucket-card/bucket-card.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ModalTextInsertionComponent } from './modal-text-insertion/modal-text-insertion.component';
import { AddBucketComponent } from './add-bucket/add-bucket.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TasksPanelComponent } from './tasks-panel/tasks-panel.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { MyBucketsComponent } from './my-buckets/my-buckets.component';
import { AllBucketsForUserComponent } from './all-buckets-for-user/all-buckets-for-user.component';
import { TasksOfBucketComponent } from './tasks-of-bucket/tasks-of-bucket.component';
import { EditBucketComponent } from './edit-bucket/edit-bucket.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelCardComponent,
    UserPanelMainComponent,
    HeaderComponent,
    BucketsPanelComponent,
    BucketCardComponent,
    AdminPanelComponent,
    ModalTextInsertionComponent,
    AddBucketComponent,
    TaskCardComponent,
    TasksPanelComponent,
    AddTaskComponent,
    CustomModalComponent,
    MyBucketsComponent,
    AllBucketsForUserComponent,
    TasksOfBucketComponent,
    EditBucketComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
