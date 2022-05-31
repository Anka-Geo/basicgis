import { LayerService } from './../services/layer.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  services: any;

  constructor(private layerService: LayerService) { }

  ngOnInit(): void {

    this.layerService.services.subscribe(services => {
      this.services = services;
    })
  }

}
