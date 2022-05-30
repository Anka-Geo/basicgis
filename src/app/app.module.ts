import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainComponent } from './main/main.component';


import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {SplitterModule} from 'primeng/splitter';
import { MapComponent } from './main/map/map.component';

const primengModules = [SidebarModule , ButtonModule, SplitterModule]


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ToolbarComponent,
    MainComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    ...primengModules,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
