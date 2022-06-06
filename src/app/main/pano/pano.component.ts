import { DrawManagerService, FeatureTypes } from './../../services/draw-manager.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bg-pano',
  templateUrl: './pano.component.html',
  styleUrls: ['./pano.component.scss']
})
export class PanoComponent implements OnInit {

  pano: any;
  draw: any;

  constructor(private drawManagerService: DrawManagerService) { }

  ngOnInit(): void {

    const ankapanapiOptions = {
      content: 'panodiv',
      aroundService: 'https://dev-gis.ankageo.com/pano/around/',
      imageService: 'https://dev-gis.ankageo.com/pano/img/',
      tileService: 'https://dev-gis.ankageo.com//pano/tile/'
    };

    this.pano = new (window as any).AnkaPanAPI.PanoGLV2(ankapanapiOptions)

    const softtext = new (window as any).AnkaSoftText.SoftTextPlugin();
    this.pano.setPlugin(softtext);

    const scalable = new (window as any).AnkaScalable.ScalablePlugin();
    this.pano.setPlugin(scalable);

    this.draw = new (window as any).AnkaDraw.DrawPlugin();
    this.pano.setPlugin(this.draw);

    this.pano.gotoLocation(41.046813254, 28.953913387);
    this.pano.start();
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
}
