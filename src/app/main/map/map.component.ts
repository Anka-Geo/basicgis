import { LineString, Point, Polygon } from 'ol/geom';
import { DrawManagerService, FeatureTypes } from './../../services/draw-manager.service';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';

@Component({
  selector: 'bg-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  mapInitilized: ReplaySubject<Map> = new ReplaySubject()
  drawLayer: VectorLayer<VectorSource> | undefined;
  // map : any;

  constructor(private drawManagerService: DrawManagerService) { }


  ngAfterViewInit(): void {
    const map = new Map({ target: 'map', controls: [] });

    map.setView(new View({
      center: fromLonLat([28.942838, 41.042689]),
      zoom: 14,
    }))

    map.addLayer(new TileLayer({
      source: new OSM(),
    }))

    this.drawLayer = new VectorLayer({
      source: new VectorSource()
    })

    map.addLayer(this.drawLayer);

    this.drawManagerService.endDraw.subscribe(res => {
      const bgFeature = res.feature;
      let geometry;
      switch (bgFeature.type) {
        case FeatureTypes.POINT:
          geometry = new Point(bgFeature.coordinates[0]);
          break;
        case FeatureTypes.LINESTRING:
          geometry = new LineString(bgFeature.coordinates);
          break;
        case FeatureTypes.POLYGON:
          geometry = new Polygon([bgFeature.coordinates]);
          break;

        default:
          break;
      }
      const translatedGeom = geometry?.transform('EPSG:4326', 'EPSG:3857')
      const feature = new Feature(translatedGeom);
      this.drawLayer?.getSource()?.addFeature(feature);
    })

    this.mapInitilized.next(map);
  }

}
