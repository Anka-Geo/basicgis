import { LineString, Point, Polygon } from 'ol/geom';
import { DrawManagerService, FeatureTypes } from './../../services/draw-manager.service';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import XYZ from 'ol/source/XYZ';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
@Component({
  selector: 'bg-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  mapInitilized: ReplaySubject<Map> = new ReplaySubject()
  drawLayer: VectorLayer<VectorSource> | undefined;
  // map : any;

  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public layer: VectorLayer<VectorSource> | undefined;;
  public style: Style;
  public feature: Feature;
  public panoCoordinate: any;
  public maxSafeInteger = Number.MAX_SAFE_INTEGER;
  /**
 * Cemberin Capi
 */
  public radius: number = 50;
  /**
   * Cemberin Rengi
   */
  public color: string = '#ff0000';

  @Input() set coordinate(value: any) {
    this.panoCoordinate = value;
    
    if (this.feature) {
      const point = new Point(value);
      this.feature.setGeometry(point);
    }
  }
  
  constructor(private drawManagerService: DrawManagerService) { }


  ngAfterViewInit(): void {
    const map = new Map({ target: 'map', controls: [] });

    map.setView(new View({
      center: fromLonLat([28.942838, 41.042689]),
      zoom: 14,
    }))

    map.addLayer(new TileLayer({
      source: new XYZ({
        url:'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
      }),
    }))

    this.drawLayer = new VectorLayer({
      source: new VectorSource()
    })

    map.addLayer(this.drawLayer);


    this.createCanvas();
    this.createCanvasContent(0.8333333333333334);
    this.layer = this.createLayer();
    if(this.layer){
      map.addLayer(this.layer)
      this.createStyle();
      this.createFeature();
    }

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
  public createCanvas(): void {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.radius * 2;
    this.canvas.height = this.radius * 2;
  }

  public createCanvasContent(fov: number): void {
    const degree = 15 + fov * 75;
    const startDegree = 270 - (degree / 2);
    const endDegree = startDegree + degree;
    this.ctx = this.canvas.getContext('2d')!;
    this.ctx.beginPath();
    this.ctx.moveTo(this.radius, this.radius);
    this.ctx.arc(this.radius, this.radius, this.radius, startDegree * (Math.PI / 180), endDegree * (Math.PI / 180));
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
  public createLayer(): any {
    return new VectorLayer({ source: new VectorSource(), zIndex: this.maxSafeInteger/*2000*/ });

  }
  public createStyle(): void {
    const image = new Icon({
      img: this.canvas,
      rotateWithView: true,
      imgSize: [this.radius * 2, this.radius * 2],
      // rotation: this.rotation ? this.rotation : 0,
      // opacity: this.opacity ? this.opacity : 1
    });

    this.style = new Style({
      image
    });
  }

  public createFeature(): void {
    this.feature = new Feature();
    this.feature.setStyle(this.style);
    const point = new Point(this.panoCoordinate);
    this.feature.setGeometry(point);
    this.layer?.getSource()?.addFeature(this.feature);
  }

}
