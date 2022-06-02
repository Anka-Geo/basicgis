import { Component, OnInit } from '@angular/core';
import { Cartesian3, createWorldTerrain, HeadingPitchRoll, Matrix4, Viewer } from 'cesium';

@Component({
  selector: 'bg-threed',
  templateUrl: './threed.component.html',
  styleUrls: ['./threed.component.scss']
})
export class ThreedComponent implements OnInit {

  viewer : Viewer | undefined;

  constructor() { }

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



  }

}
