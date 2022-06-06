import { PanoComponent } from './pano.component';
import { DrawTypes, FeatureTypes, BgFeature, DrawManagerService, DrawSource } from './../../services/draw-manager.service';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'bg-pano-draw'
})
export class PanoDrawDirective {

  @Input() drawType: DrawTypes | undefined;
  draw: any;

  constructor(private panoComponent: PanoComponent, private drawManagerService: DrawManagerService) { }

  ngOnInit(): void {
    switch (this.drawType) {
      case DrawTypes.PANOPOINT:
        this.panoComponent.draw.startPoint();
        break;
      case DrawTypes.PANOLINESTRING:
        this.panoComponent.draw.startLine();
        break;
      case DrawTypes.PANOPOLYGON:
        this.panoComponent.draw.startPolygon();
        break;

      default:
        break;
    }

    this.panoComponent.draw.addEvent('onStatusChange', (res: any) => {
      if (res.status === 'FINISHED') {
        console.log(res);
        const feature = res.feature;
        const type = res.drawType;
        let bgFeatureType: FeatureTypes;
        switch (type) {
          case 'Point':
            bgFeatureType = FeatureTypes.POINT;
            break;
          case 'Line':
            bgFeatureType = FeatureTypes.LINESTRING;
            break;
          case 'Polygon':
            bgFeatureType = FeatureTypes.POLYGON;
            break;
          default:
            break;
        }
        const points = feature.points
        this.panoComponent.pano.getScalable().getMainSketchLayer().removeAllChildren()
        this.panoComponent.pano.getScalable().getMainSketchLayer().refresh();
        const coordinates = points.map((obj: any) => [obj.lon, obj.lat])
        const bgFeature = new BgFeature(coordinates, bgFeatureType!)
        this.drawManagerService.endDrawing(bgFeature, DrawSource.PANO)
      }

    })

  }

}
