import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPanelMainComponent } from './user-panel-main/user-panel-main.component';
import { BucketsPanelComponent } from './buckets-panel/buckets-panel.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

const routes: Routes = [
  { path: '', redirectTo: 'user-panel', pathMatch: 'full' },
  {
    path: 'user-panel',
    component: UserPanelMainComponent,
  },
  {
    path: 'buckets',
    component: BucketsPanelComponent,
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
