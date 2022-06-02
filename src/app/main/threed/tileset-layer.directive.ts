import { ThreedComponent } from './threed.component';
import { Directive, Input } from '@angular/core';
import { Cesium3DTileset } from 'cesium';

@Directive({
  selector: 'bg-tileset-layer'
})
export class TilesetLayerDirective {

  @Input() url: any;


  constructor(private threedComponent : ThreedComponent) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const tileset = new Cesium3DTileset({
      url: this.url,
    })
    this.threedComponent.viewer!.scene.primitives.add(tileset);
  }

}
