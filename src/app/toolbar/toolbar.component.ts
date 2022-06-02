import { DrawTypes, DrawManagerService } from './../services/draw-manager.service';
import { SidebarService } from './../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bg-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isSidebarOpen = false;
  items: any;

  constructor(public sidebarService: SidebarService,
    private drawManagerService: DrawManagerService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Point',
        items: [
          { label: 'Map', command: () => { this.drawManagerService.startDrawing(DrawTypes.MAPPOINT) } },
          { label: 'Panorama' },
          { label: 'Threed' }
        ]
      },
      {
        label: 'Line',
        items: [
          { label: 'Map', command: () => { this.drawManagerService.startDrawing(DrawTypes.MAPLINESTRING) } },
          { label: 'Panorama' },
          { label: 'Threed' }
        ]
      },
      {
        label: 'Polygon',
        items: [
          { label: 'Map', command: () => { this.drawManagerService.startDrawing(DrawTypes.MAPPOLYGON) } },
          { label: 'Panorama' },
          { label: 'Threed' }
        ]
      }
    ];
  }

  onClickOpenCloseSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen
    this.sidebarService.sidebarOpened.next(this.isSidebarOpen);
  }

  drawStart(drawType: DrawTypes) {
    console.log("geldim");

  }

}
