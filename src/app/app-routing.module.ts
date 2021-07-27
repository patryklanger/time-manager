import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPanelMainComponent } from './ui/user-panel-main/user-panel-main.component';
import { BucketsPanelComponent } from './buckets/buckets-panel/buckets-panel.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'user-panel', pathMatch: 'full' },
  {
    path: 'user-panel',
    component: UserPanelMainComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'buckets/my',
    component: MyBucketsComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'tasks/my',
    component: MyTasksComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'tasks/all',
    component: AllTasksForUserComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'buckets/all',
    component: AllBucketsForUserComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   requiredRoles: ['ADMIN'],
    // },
  },
  {
    path: 'admin-panel/users',
    component: UsersPanelComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   requiredRoles: ['ADMIN'],
    // },
  },
  {
    path: 'admin-panel/tasks',
    component: AllTasksComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   requiredRoles: ['ADMIN'],
    // },
  },
  {
    path: 'admin-panel/buckets',
    component: AllBucketsComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   requiredRoles: ['ADMIN'],
    // },
  },
  {
    path: 'tasks/bucket/:id',
    component: TasksOfBucketComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'tasks',
    component: TasksPanelComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegistrationPanelComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
