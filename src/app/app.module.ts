import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PanelCardComponent } from './panel-card/panel-card.component';
import { UserPanelMainComponent } from './user-panel-main/user-panel-main.component';
import { HeaderComponent } from './header/header.component';
import { BucketsPanelComponent } from './buckets-panel/buckets-panel.component';
import { BucketCardComponent } from './bucket-card/bucket-card.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ModalTextInsertionComponent } from './modal-text-insertion/modal-text-insertion.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
