import { DrawTypes, DrawManagerService, DrawSource, BgFeature, FeatureTypes } from './../../services/draw-manager.service';
import { MapComponent } from './map.component';
import { Directive, Input } from '@angular/core';
import Draw from 'ol/interaction/Draw'

@Directive({
  selector: 'bg-map-draw'
})
export class MapDrawDirective {

  @Input() drawType: DrawTypes | undefined;
  draw: Draw | undefined;
  constructor(private mapComponent: MapComponent, private drawManagerService: DrawManagerService) { }

  ngOnInit(): void {

    switch (this.drawType) {
      case DrawTypes.MAPPOINT:
        this.draw = new Draw({
          type: 'Point'
        });

        break;
      case DrawTypes.MAPLINESTRING:
        this.draw = new Draw({
          type: 'LineString'
        });
        break;
      case DrawTypes.MAPPOLYGON:
        this.draw = new Draw({
          type: 'Polygon'
        });
        break;

      default:
        break;
    }

    this.mapComponent.mapInitilized.subscribe(res => {
      res.addInteraction(this.draw!);
      this.draw?.on('drawend', (res) => {
        const feature = res.feature;
        const geometry = feature.getGeometry();
        const type = geometry?.getType();
        let bgFeatureType: FeatureTypes;
        let coordinates : Array<[]> | undefined;
        const cloneGeom = geometry?.clone()
        const translatedGeom = cloneGeom?.transform('EPSG:3857' , 'EPSG:4326')
        switch (type) {
          case 'Point':
            bgFeatureType = FeatureTypes.POINT;
            coordinates = [(translatedGeom as any).getCoordinates()]
            break;
          case 'LineString':
            bgFeatureType = FeatureTypes.LINESTRING;
            coordinates = (translatedGeom as any).getCoordinates()
            break;
          case 'Polygon':
            bgFeatureType = FeatureTypes.POLYGON;
            coordinates = (translatedGeom as any).getCoordinates()[0]
            break;
          default:
            break;
        }
        const bgFeature = new BgFeature(coordinates!, bgFeatureType!)
        this.drawManagerService.endDrawing(bgFeature, DrawSource.MAP)
      })
    })
  }

  ngOnDestroy(): void {
    this.mapComponent.mapInitilized.subscribe(res => {
      res.removeInteraction(this.draw!);
    })
  }

}
