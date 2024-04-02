import { DrawManagerService, DrawTypes } from './../services/draw-manager.service';
import { LayerService } from './../services/layer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  services: any;
  drawStatus: DrawTypes | undefined;
  currentPanoLocation = [0, 0];
  get drawTypes() {
    return DrawTypes;
  }

  constructor(private layerService: LayerService, private drawManager: DrawManagerService) { }

  ngOnInit(): void {

    this.layerService.services.subscribe(services => {
      this.services = services;
    })

    this.drawManager.startDraw.subscribe(res => {
      this.drawStatus = res;
    })
  }
  setCoords(coords:any){
    this.currentPanoLocation = coords;
  }

}
