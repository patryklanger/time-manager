import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPanelMainComponent } from './ui/user-panel-main/user-panel-main.component';
import { AdminPanelComponent } from './ui/admin-panel/admin-panel.component';
import { TasksPanelComponent } from './tasks/tasks-panel/tasks-panel.component';
import { MyBucketsComponent } from './buckets/my-buckets/my-buckets.component';
import { AllBucketsForUserComponent } from './buckets/all-buckets-for-user/all-buckets-for-user.component';
import { TasksOfBucketComponent } from './tasks/tasks-of-bucket/tasks-of-bucket.component';
import { MyTasksComponent } from './tasks/my-tasks/my-tasks.component';
import { AllTasksForUserComponent } from './tasks/all-tasks-for-user/all-tasks-for-user.component';
import { UsersPanelComponent } from './users/users-panel/users-panel.component';
import { AllBucketsComponent } from './buckets/all-buckets/all-buckets.component';
import { AllTasksComponent } from './tasks/all-tasks/all-tasks.component';
import { AuthGuard } from './guard/auth.guard';
import { RegistrationPanelComponent } from './ui/registration-panel/registration-panel.component';
import { UnassignedBucketsComponent } from './buckets/unassigned-buckets/unassigned-buckets.component';
import { BannedUsersComponent } from './users/banned-users/banned-users.component';
import { GuestsPanelComponent } from './guests/guests-panel/guests-panel.component';
import { AllSubscriptionsComponent } from './subscriptions/all-subscriptions/all-subscriptions.component';
import { SubscriptionsForGuestComponent } from './subscriptions/subscriptions-for-guest/subscriptions-for-guest.component';
import { TimersForTaskComponent } from './timers/timers-for-task/timers-for-task.component';
import { TimersForAdminComponent } from './timers/timers-for-admin/timers-for-admin.component';
import { LogsOfTaskComponent } from './logs/logs-of-task/logs-of-task.component';
import { WelcomePageComponent } from './ui/welcome-page/welcome-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-panel', pathMatch: 'full' },
  {
    path: 'user-panel',
    component: UserPanelMainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
  },
  {
    path: 'buckets/my',
    component: MyBucketsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks/my',
    component: MyTasksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks/all',
    component: AllTasksForUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'buckets/all',
    component: AllBucketsForUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'admin-panel/users',
    component: UsersPanelComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'admin-panel/logs/:type/:id',
    component: LogsOfTaskComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'admin-panel/users/banned',
    component: BannedUsersComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'admin-panel/tasks',
    component: AllTasksComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'admin-panel/timers',
    component: TimersForAdminComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'admin-panel/buckets',
    component: AllBucketsComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'admin-panel/buckets/unassigned',
    component: UnassignedBucketsComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'admin-panel/guests',
    component: GuestsPanelComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'admin-panel/subscriptions/all',
    component: AllSubscriptionsComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'admin-panel/subscriptions/guest/:id',
    component: SubscriptionsForGuestComponent,
    canActivate: [AuthGuard],
    data: {
      requiredRoles: ['ADMIN'],
    },
  },
  {
    path: 'tasks/bucket/:id',
    component: TasksOfBucketComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tasks',
    component: TasksPanelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegistrationPanelComponent,
  },
  {
    path: 'timers/tasks/:id',
    component: TimersForTaskComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
