import { DrawManagerService, FeatureTypes } from './../../services/draw-manager.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { toLonLat, fromLonLat } from 'ol/proj';
@Component({
  selector: 'bg-pano',
  templateUrl: './pano.component.html',
  styleUrls: ['./pano.component.scss']
})
export class PanoComponent implements OnInit {

  pano: any;
  draw: any;
  PanoGL: any;
  
  @Output() setCoords = new EventEmitter<any>();

  constructor(private drawManagerService: DrawManagerService) { }

  ngOnInit(): void {

    const ankapanapiOptions = {
      content: 'panodiv',
      aroundService: 'https://atlant-dev.ankageo.com/pano/around/',
      imageService: 'https://atlant-dev.ankageo.com/pano/img/',
      tileService: 'https://atlant-dev.ankageo.com//pano/tile/'
    };

    this.pano = new (window as any).AnkaPanAPI.PanoGLV2(ankapanapiOptions)
    this.PanoGL = (window as any).AnkaPanAPI.PanoGLV2;
    const softtext = new (window as any).AnkaSoftText.SoftTextPlugin();
    this.pano.setPlugin(softtext);

    const scalable = new (window as any).AnkaScalable.ScalablePlugin();
    this.pano.setPlugin(scalable);

    this.draw = new (window as any).AnkaDraw.DrawPlugin();
    this.pano.setPlugin(this.draw);

    this.pano.gotoLocation(41.046813254, 28.953913387);
    this.pano.start();
    this.pano.addEvent(this.PanoGL.LOCATION_CHANGE, null, this.onLocationChange);
    (window as any).pano = this.pano;

    const sketchLayer = new (window as any).AnkaScalable.Layer();
    this.pano.getScalable().addLayer(sketchLayer);

    this.drawManagerService.endDraw.subscribe(res => {
      const bgFeature = res.feature;
      let wkt: string;
      switch (bgFeature.type) {
        case FeatureTypes.POINT:
          wkt = `POINT (${bgFeature.coordinates[0].join(' ')})`
          break;
        case FeatureTypes.LINESTRING:
          const coordinateArray = [];
          for (const coordinate of bgFeature.coordinates) {
            coordinateArray.push(coordinate.join(' '))
          }
          wkt = `LINESTRING ( ${coordinateArray.join(',')} )`
          break;
        case FeatureTypes.POLYGON:
          const coordinateArrayPolygon = [];
          for (const coordinate of bgFeature.coordinates) {
            coordinateArrayPolygon.push(coordinate.join(' '))
          }
          wkt = `POLYGON (( ${coordinateArrayPolygon.join(',')} ))`
          break;

        default:
          break;
      }

      const gdh = new (window as any).AnkaScalable.GeomDataHolder.fromWKT(wkt!);
      sketchLayer.addToLocalAndGlobal(gdh);
      sketchLayer.refresh();
    })
  }
  onLocationChange = (event: any) => {
    const translated = fromLonLat([event.lon, event.lat]);
    this.setCoords.next(translated)
  }

}
