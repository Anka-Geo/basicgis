import { TileLayerDirective } from './tile-layer.directive';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'bgLayer'
})
export class LayerDirective {

  @Input() layerName: string = '';

  @Input() set visible(value: boolean) {
    const params = this.tileLayerDirective.tileLayer.getSource().getParams();
    if (value) {
      if (params.LAYERS) {
        this.tileLayerDirective.tileLayer.getSource().updateParams({ LAYERS: params.LAYERS + ',' + this.layerName, TILED: true });
      } else {
        this.tileLayerDirective.tileLayer.getSource().updateParams({ LAYERS: this.layerName, TILED: true });
        this.tileLayerDirective.tileLayer.setVisible(true);
      }
    } else {
      if (params.LAYERS) {
        const layerArray = params.LAYERS.split(',');
        const hasLayer = layerArray.includes(this.layerName);
        if (hasLayer) {
          layerArray.splice(layerArray.indexOf(this.layerName), 1)
          this.tileLayerDirective.tileLayer.getSource().updateParams({ LAYERS: layerArray.join(','), TILED: true });
          if (layerArray.length === 0) {
            this.tileLayerDirective.tileLayer.setVisible(false);
          }
        }
      }
    }
  };

  constructor(private tileLayerDirective: TileLayerDirective) { }
}
