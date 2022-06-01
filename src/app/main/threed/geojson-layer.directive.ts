import { ThreedComponent } from './threed.component';
import { Directive, Input } from '@angular/core';
import { Color, Entity, GeoJsonDataSource } from 'cesium';

@Directive({
  selector: 'bg-geojson-layer'
})
export class GeojsonLayerDirective {

  geoserverLayer: any;

  @Input() url: any;
  @Input() name: any;
  @Input() set visible(value: boolean) {
    if (this.geoserverLayer) {
      this.geoserverLayer.show = value;

    }
  };

  constructor(private threedComponent: ThreedComponent) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    if (this.name === 'manhole_usr' || this.name === 'yapilar_usr') {      
      GeoJsonDataSource.load(`${this.url}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${this.name}&outputFormat=application/json&srsName=EPSG:4326`,
        {
          stroke: Color.HOTPINK,
          fill: Color.PINK,
          strokeWidth: 3,
          markerSymbol: '?'
        }).then(res => {
          this.geoserverLayer = res;
          this.geoserverLayer.show = this.visible ? this.visible : false;
          this.geoserverLayer.entities.values.forEach((entity : any) => {
            entity.polygon.extrudedHeight = Math.random() * 100;
          });
          // debugger
          this.threedComponent.viewer!.dataSources.add(this.geoserverLayer);
        })
    }else {
      GeoJsonDataSource.load(`${this.url}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${this.name}&outputFormat=application/json&srsName=EPSG:4326`,
        {
          stroke: Color.BLUE,
          fill: Color.RED,
          strokeWidth: 3,
          markerSymbol: '?'
        }).then(res => {
          this.geoserverLayer = res;
          this.geoserverLayer.show = this.visible ? this.visible : false;
          this.threedComponent.viewer!.dataSources.add(this.geoserverLayer);
        })

    }

  }

}
