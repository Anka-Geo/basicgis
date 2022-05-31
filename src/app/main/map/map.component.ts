import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'bg-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  mapInitilized: ReplaySubject<Map> = new ReplaySubject()

  // map : any;

  constructor() { }


  ngAfterViewInit(): void {
    const map = new Map({ target: 'map', controls: [] });

    map.setView(new View({
      center: fromLonLat([28.942838, 41.042689]),
      zoom: 14,
    }))

    map.addLayer(new TileLayer({
      source: new OSM(),
    }))

    this.mapInitilized.next(map);

    // this.map = map;

  }

}
