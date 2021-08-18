import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';

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
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { AddMembersModalComponent } from './ui/add-members-modal/add-members-modal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DialogBoxMessageComponent } from './ui/dialog-box-message/dialog-box-message.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SureDialogComponentComponent } from './ui/sure-dialog-component/sure-dialog-component.component';
import { NumberToHhmmssPipe } from './pipes/number-to-hhmmss.pipe';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';
import { DateToStringPipe } from './pipes/date-to-string.pipe';
import { DateToTimeStringPipe } from './pipes/date-to-time-string.pipe';
import { DateToServerStringPipe } from './pipes/date-to-server-string.pipe';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { UnassignedBucketsComponent } from './buckets/unassigned-buckets/unassigned-buckets.component';
import { BannedUsersComponent } from './users/banned-users/banned-users.component';
import { SelectUserByEmailComponent } from './ui/select-user-by-email/select-user-by-email.component';
import { TimerCardComponent } from './timers/timer-card/timer-card.component';
import { TimersPanelComponent } from './timers/timers-panel/timers-panel.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GuestCardComponent } from './guests/guest-card/guest-card.component';
import { GuestsPanelComponent } from './guests/guests-panel/guests-panel.component';
import { SubscriptionCardComponent } from './subscriptions/subscription-card/subscription-card.component';
import { SubscriptionsPanelComponent } from './subscriptions/subscriptions-panel/subscriptions-panel.component';
import { AllSubscriptionsComponent } from './subscriptions/all-subscriptions/all-subscriptions.component';
import { SubscriptionsForGuestComponent } from './subscriptions/subscriptions-for-guest/subscriptions-for-guest.component';
import { TimersForTaskComponent } from './timers/timers-for-task/timers-for-task.component';
import { TimersForAdminComponent } from './timers/timers-for-admin/timers-for-admin.component';
import { EditTotalTimeComponent } from './timers/edit-total-time/edit-total-time.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { LogCardComponent } from './logs/log-card/log-card.component';
import { LogsPanelComponent } from './logs/logs-panel/logs-panel.component';
import { LogsOfTaskComponent } from './logs/logs-of-task/logs-of-task.component';
import { MatListModule } from '@angular/material/list';
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
    DialogBoxMessageComponent,
    SureDialogComponentComponent,
    NumberToHhmmssPipe,
    EditTaskComponent,
    DateToStringPipe,
    DateToTimeStringPipe,
    DateToServerStringPipe,
    TaskDetailsComponent,
    UnassignedBucketsComponent,
    BannedUsersComponent,
    SelectUserByEmailComponent,
    TimerCardComponent,
    TimersPanelComponent,
    GuestCardComponent,
    GuestsPanelComponent,
    SubscriptionCardComponent,
    SubscriptionsPanelComponent,
    AllSubscriptionsComponent,
    SubscriptionsForGuestComponent,
    TimersForTaskComponent,
    TimersForAdminComponent,
    EditTotalTimeComponent,
    LogCardComponent,
    LogsPanelComponent,
    LogsOfTaskComponent,
  ],
  imports: [
    MatTooltipModule,
    MatListModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatProgressSpinnerModule,
    MatMomentDateModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatRadioModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
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
