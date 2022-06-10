import { FeatureTypes, BgFeature, DrawManagerService, DrawSource } from './../../services/draw-manager.service';
import { ThreedComponent } from './threed.component';
import { Directive, Input } from '@angular/core';
import { Cartographic, Color, Ellipsoid, HeightReference, ScreenSpaceEventHandler, ScreenSpaceEventType } from 'cesium';
import { DrawTypes } from 'src/app/services/draw-manager.service';

@Directive({
  selector: 'bg-threed-draw'
})
export class ThreedDrawDirective {

  @Input() drawType: DrawTypes | undefined;
  screenSpaceEventHandler: any;
  constructor(private threedComponent: ThreedComponent, private drawManagerService: DrawManagerService) { }

  ngOnInit(): void {
    const viewer = this.threedComponent.viewer!;
    this.screenSpaceEventHandler = new ScreenSpaceEventHandler(viewer.scene.canvas);
    viewer.scene.canvas.style.cursor = 'crosshair';
    const position: any = [];


    switch (this.drawType) {
      case DrawTypes.THREEDPOINT:
        this.screenSpaceEventHandler.setInputAction((click: any) => {
          var clickPosition = viewer.camera.pickEllipsoid(click.position);
          const pointEntity = viewer.entities.add({
            position: clickPosition,
            point: {
              heightReference: HeightReference.CLAMP_TO_GROUND,
              pixelSize: 5,
              color: Color.RED
            }
          });
          viewer.entities.remove(pointEntity);
          this.removeInputActionHandler([clickPosition], FeatureTypes.POINT);
        }, ScreenSpaceEventType.LEFT_CLICK)
        break;
      case DrawTypes.THREEDLINESTRING:
        const polylineEntity = viewer.entities.add({ polyline: { material: Color.RED } })
        const context = () => {
          viewer.entities.remove(polylineEntity);
          this.removeInputActionHandler(position, FeatureTypes.LINESTRING);
          document.removeEventListener('contextmenu', context)
        }
        document.addEventListener('contextmenu', () => {
          context();
        })
        this.screenSpaceEventHandler.setInputAction((click: any) => {
          var clickPosition = viewer.camera.pickEllipsoid(click.position);
          position.push(clickPosition);
          polylineEntity.polyline!.positions = position;

        }, ScreenSpaceEventType.LEFT_CLICK)
        break;
      case DrawTypes.THREEDPOLYGON:
        const polygonEntity = viewer.entities.add({
          polygon: {
            material: new Color(1, 0, 0, 0.6)
          }
        });
        const contextPolygon = () => {
          viewer.entities.remove(polygonEntity);
          this.removeInputActionHandler(position, FeatureTypes.POLYGON);
          document.removeEventListener('contextmenu', contextPolygon)
        }
        document.addEventListener('contextmenu', () => {
          contextPolygon();
        })
        this.screenSpaceEventHandler.setInputAction((click: any) => {
          var clickPosition = viewer.camera.pickEllipsoid(click.position);
          position.push(clickPosition);
          polygonEntity.polygon!.hierarchy = position;
        }, ScreenSpaceEventType.LEFT_CLICK)
        break;

      default:
        break;
    }
  }

  removeInputActionHandler(positions: any, featureType: FeatureTypes) {
    const coordinates: any = positions.map((position: any) => this.toDegrees(position))
    const bgFeature = new BgFeature(coordinates!, featureType)
    this.drawManagerService.endDrawing(bgFeature, DrawSource.THREED)
    this.threedComponent.viewer!.scene.canvas.style.cursor = 'default';
    this.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK);
  }

  toDegrees(cartesian: any) {
    let pos = Cartographic.fromCartesian(cartesian)
    return [pos.longitude / Math.PI * 180, pos.latitude / Math.PI * 180]
  }

}
