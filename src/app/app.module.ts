import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';

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
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { AllTasksForUserComponent } from './all-tasks-for-user/all-tasks-for-user.component';
import { UsersPanelComponent } from './users-panel/users-panel.component';
import { UserCardComponent } from './user-card/user-card.component';
import { AllBucketsComponent } from './all-buckets/all-buckets.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    KeycloakAngularModule,
    HttpClientModule
  ],
  providers: [
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
