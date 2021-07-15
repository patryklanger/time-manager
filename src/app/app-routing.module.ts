import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPanelMainComponent } from './user-panel-main/user-panel-main.component';
import { BucketsPanelComponent } from './buckets-panel/buckets-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { TasksPanelComponent } from './tasks-panel/tasks-panel.component';
import { MyBucketsComponent } from './my-buckets/my-buckets.component';
import { AllBucketsForUserComponent } from './all-buckets-for-user/all-buckets-for-user.component';
import { TasksOfBucketComponent } from './tasks-of-bucket/tasks-of-bucket.component';
import { MyTasksComponent } from './my-tasks/my-tasks.component';
import { AllTasksForUserComponent } from './all-tasks-for-user/all-tasks-for-user.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-panel', pathMatch: 'full' },
  {
    path: 'user-panel',
    component: UserPanelMainComponent,
  },
  {
    path: 'buckets/my',
    component: MyBucketsComponent,
  },
  {
    path: 'tasks/my',
    component: MyTasksComponent,
  },
  {
    path: 'tasks/all',
    component: AllTasksForUserComponent,
  },
  {
    path: 'buckets/all',
    component: AllBucketsForUserComponent,
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
  },
  {
    path: 'tasks/bucket/:id',
    component: TasksOfBucketComponent,
  },
  {
    path: 'tasks',
    component: TasksPanelComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
