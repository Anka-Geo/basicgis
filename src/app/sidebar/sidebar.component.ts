import { LayerService } from './../services/layer.service';
import { SidebarService } from './../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bg-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  display = false;
  services: any;
  constructor(public sidebarService: SidebarService, private layerService: LayerService) { }

  ngOnInit(): void {

    this.sidebarService.sidebarOpened.subscribe(res => {
      this.display = res;
    })

    this.layerService.services.subscribe(services => {
      this.services = services;
    })
  }

  changeLayerVisibility(event: any, layer: any) {
    layer.visible = event.checked
  }

}
