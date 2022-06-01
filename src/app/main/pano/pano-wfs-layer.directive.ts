import { PanoComponent } from './pano.component';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'bg-pano-wfsLayer'
})
export class PanoWfsLayerDirective {

  @Input() url: any;
  @Input() name: any;
  @Input() set visible(value : boolean){
    if (this.wfsLayer) {
      this.wfsLayer.visible = value;
      
    }
  };

  wfsLayer : any;

  constructor(private panoComponent : PanoComponent) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (this.url && this.name) {
      this.wfsLayer = new (window as any).AnkaScalable.GeoServerWFSLayer(this.name, this.url + '/ows', this.name, 'geom');
      this.panoComponent.pano.getScalable().addLayer(this.wfsLayer);
      this.wfsLayer.visible = this.visible;
      this.wfsLayer.redraw(true);
    }
  }

  ngOnDestroy(): void {
    this.panoComponent.pano.getScalable().removeLayer(this.wfsLayer);
  }

}
