import { DrawManagerService, FeatureTypes } from './../../services/draw-manager.service';
import { Component, OnInit } from '@angular/core';
import { Cartesian3, Color, createWorldTerrain, Entity, HeadingPitchRoll, Matrix4, Viewer } from 'cesium';

@Component({
  selector: 'bg-threed',
  templateUrl: './threed.component.html',
  styleUrls: ['./threed.component.scss']
})
export class ThreedComponent implements OnInit {

  viewer: Viewer | undefined;

  constructor(private drawManagerService: DrawManagerService) { }

  ngOnInit(): void {
    this.viewer = new Viewer('threeddiv', {
      timeline: false,
      sceneModePicker: false,
      homeButton: false,
      // terrainProvider: createWorldTerrain()
    });

    const initialPosition = Cartesian3.fromDegrees(
      28.942838,
      41.042689,
      750
    );
    const initialOrientation = HeadingPitchRoll.fromDegrees(
      21.27879878293835,
      -21.34390550872461,
      0.0716951918898415
    );
    this.viewer.scene.camera.setView({
      destination: initialPosition,
      orientation: initialOrientation,
      endTransform: Matrix4.IDENTITY,
    });

    this.drawManagerService.endDraw.subscribe(res => {
      const bgFeature = res.feature;
      let entity: any;
      switch (bgFeature.type) {
        case FeatureTypes.POINT:
          entity = new Entity({
            position: Cartesian3.fromDegreesArray(bgFeature.coordinates.flat() as any)[0],
            point: {
              pixelSize: 5,
              color: Color.RED
            }
          });
          break;
        case FeatureTypes.LINESTRING:
          entity = new Entity({
            polyline: {
              material: Color.RED,
              positions: Cartesian3.fromDegreesArray(bgFeature.coordinates.flat() as any)
            }
          })
          break;
        case FeatureTypes.POLYGON:
          entity = new Entity({
            polygon: {
              material: new Color(1, 0, 0, 0.6),
              hierarchy: Cartesian3.fromDegreesArray(bgFeature.coordinates.flat() as any) as any
            }
          });
          break;

        default:
          break;
      }
      this.viewer?.entities.add(entity!);
    })

  }

}
