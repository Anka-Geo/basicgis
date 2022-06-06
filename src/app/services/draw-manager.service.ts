import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum FeatureTypes {
  'POINT' = 1,
  'LINESTRING' = 2,
  'POLYGON' = 3
}

export enum DrawSource {
  'MAP' = 1,
  'PANO' = 2,
  'THREED' = 3
}

export enum DrawTypes {
  'DEFAULT' = 0,
  'MAPPOINT' = 1,
  'MAPLINESTRING' = 2,
  'MAPPOLYGON' = 3,
  'PANOPOINT' = 4,
  'PANOLINESTRING' = 5,
  'PANOPOLYGON' = 6,
  'THREEDPOINT' = 7,
  'THREEDLINESTRING' = 8,
  'THREEDPOLYGON' = 9
}

@Injectable({
  providedIn: 'root'
})
export class DrawManagerService {

  startDraw: Subject<DrawTypes> = new Subject();
  endDraw: Subject<{ feature: BgFeature, source: DrawSource }> = new Subject();

  constructor() { }

  startDrawing(drawType: DrawTypes) {
    this.startDraw.next(drawType);
  }

  endDrawing(feature: BgFeature, source: DrawSource) {
    this.startDrawing(DrawTypes.DEFAULT);
    this.endDraw.next({ feature, source });
  }
}

/**
 * @param  {Array<[]>}  Coordinates 
 * @param {FeatureTypes} type 
 */
export class BgFeature {

  coordinates;
  type;

  constructor(coordinates: Array<[]>, type: FeatureTypes) {
    this.coordinates = coordinates;
    this.type = type;
  }
}
