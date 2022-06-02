import { LayerDirective } from './main/map/layer.directive';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';


import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { SplitterModule } from 'primeng/splitter';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { MenubarModule } from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { MapComponent } from './main/map/map.component';
import { TileLayerDirective } from './main/map/tile-layer.directive';
import { PanoComponent } from './main/pano/pano.component';
import { PanoWfsLayerDirective } from './main/pano/pano-wfs-layer.directive';
import { ThreedComponent } from './main/threed/threed.component';
import { GeojsonLayerDirective } from './main/threed/geojson-layer.directive';
import { TilesetLayerDirective } from './main/threed/tileset-layer.directive';

const primengModules = [SidebarModule, ButtonModule, SplitterModule,
  AccordionModule, CheckboxModule, MenubarModule]


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ToolbarComponent,
    MainComponent,
    MapComponent,
    TileLayerDirective,
    LayerDirective,
    PanoComponent,
    PanoWfsLayerDirective,
    ThreedComponent,
    GeojsonLayerDirective,
    TilesetLayerDirective
  ],
  imports: [
    BrowserModule,
    ...primengModules,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
