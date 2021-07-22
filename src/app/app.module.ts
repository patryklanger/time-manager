import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelCardComponent } from './ui/panel-card/panel-card.component';
import { UserPanelMainComponent } from './ui/user-panel-main/user-panel-main.component';
import { HeaderComponent } from './ui/header/header.component';
import { BucketsPanelComponent } from './buckets/buckets-panel/buckets-panel.component';
import { BucketCardComponent } from './buckets/bucket-card/bucket-card.component';
import { AdminPanelComponent } from './ui/admin-panel/admin-panel.component';
import { ModalTextInsertionComponent } from './ui/modal-text-insertion/modal-text-insertion.component';
import { AddBucketComponent } from './buckets/add-bucket/add-bucket.component';
import { TaskCardComponent } from './tasks/task-card/task-card.component';
import { TasksPanelComponent } from './tasks/tasks-panel/tasks-panel.component';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomModalComponent } from './ui/custom-modal/custom-modal.component';
import { MyBucketsComponent } from './buckets/my-buckets/my-buckets.component';
import { AllBucketsForUserComponent } from './buckets/all-buckets-for-user/all-buckets-for-user.component';
import { TasksOfBucketComponent } from './tasks/tasks-of-bucket/tasks-of-bucket.component';
import { EditBucketComponent } from './buckets/edit-bucket/edit-bucket.component';
import { EditProfileComponent } from './users/edit-profile/edit-profile.component';
import { MyTasksComponent } from './tasks/my-tasks/my-tasks.component';
import { AllTasksForUserComponent } from './tasks/all-tasks-for-user/all-tasks-for-user.component';
import { UsersPanelComponent } from './users/users-panel/users-panel.component';
import { UserCardComponent } from './users/user-card/user-card.component';
import { AllBucketsComponent } from './buckets/all-buckets/all-buckets.component';
import { AllTasksComponent } from './tasks/all-tasks/all-tasks.component';
import { RegistrationPanelComponent } from './ui/registration-panel/registration-panel.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { AddMembersModalComponent } from './ui/add-members-modal/add-members-modal.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://10.1.17.45:8080/auth',
        realm: 'test-realm',
        clientId: 'front-end-client',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}

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
    EditProfileComponent,
    MyTasksComponent,
    AllTasksForUserComponent,
    UsersPanelComponent,
    UserCardComponent,
    AllBucketsComponent,
    AllTasksComponent,
    RegistrationPanelComponent,
    AddMembersModalComponent,
  ],
  imports: [
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    NgxMatNativeDateModule,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
