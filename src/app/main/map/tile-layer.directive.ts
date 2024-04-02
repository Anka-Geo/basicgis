import { MapComponent } from './map.component';
import TileWMS from 'ol/source/TileWMS';
import TileLayer from 'ol/layer/Tile';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'bgTileLayer'
})
export class TileLayerDirective {

  @Input() url: string | undefined = undefined;

  tileLayer: any;

  constructor(private mapComponent: MapComponent) { }
  ngOnInit(): void {
    this.tileLayer = new TileLayer({
      visible: false,
      source: new TileWMS({
        url: this.url + "/wms",
        params: { 'TILED': true, token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOjE5NzQsImlhdCI6MTcxMjA1OTY1NiwiZXhwIjoxNzEyMTAyODU2fQ.kOMbm7tjjqPVMA2CFyGFfqUhIv-EbXKIl_UN7VhGmFE'},
        serverType: 'geoserver'
      })
    });

    this.mapComponent.mapInitilized.subscribe(map => {
      map.addLayer(this.tileLayer);
    })

    // this.mapComponent.map.addLayer(this.tileLayer)

  }

}
