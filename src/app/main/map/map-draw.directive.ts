import { DrawTypes, DrawManagerService, DrawSource, BgFeature } from './../../services/draw-manager.service';
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
          type: 'Point',
          source:this.mapComponent.drawLayer?.getSource()!
        });

        break;
      case DrawTypes.MAPLINESTRING:
        this.draw = new Draw({
          type: 'LineString',
          source:this.mapComponent.drawLayer?.getSource()!
        });
        break;
      case DrawTypes.MAPPOLYGON:
        this.draw = new Draw({
          type: 'Polygon',
          source:this.mapComponent.drawLayer?.getSource()!
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
        const coordinates = (geometry as any).getCoordinates()
        const bgFeature = new BgFeature(coordinates[0], type)
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
