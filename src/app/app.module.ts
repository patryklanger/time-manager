import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserPanelMainComponent } from './user-panel-main/user-panel-main.component';
import { PanelCardComponent } from './panel-card/panel-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserPanelMainComponent,
    PanelCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
