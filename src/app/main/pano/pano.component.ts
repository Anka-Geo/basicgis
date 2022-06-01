import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bg-pano',
  templateUrl: './pano.component.html',
  styleUrls: ['./pano.component.scss']
})
export class PanoComponent implements OnInit {

  pano: any;

  constructor() { }

  ngOnInit(): void {

    const ankapanapiOptions = {
      content: 'panodiv',
      aroundService: 'https://dev-gis.ankageo.com/pano/around/',
      imageService: 'https://dev-gis.ankageo.com/pano/img/',
      tileService: 'https://dev-gis.ankageo.com//pano/tile/'
    };

    this.pano = new (window as any).AnkaPanAPI.PanoGLV2(ankapanapiOptions)

    const softtext = new (window as any).AnkaSoftText.SoftTextPlugin();
    this.pano.setPlugin(softtext);

    const scalable = new (window as any).AnkaScalable.ScalablePlugin();
    this.pano.setPlugin(scalable);

    // const draw = new (window as any).AnkaDraw.DrawPlugin();
    // this.pano.setPlugin(draw);

    this.pano.gotoLocation(41.046813254, 28.953913387);
    this.pano.start();
  }

}
