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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
