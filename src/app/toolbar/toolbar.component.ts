import { SidebarService } from './../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bg-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isSidebarOpen = false;

  constructor(public sidebarService : SidebarService) { }

  ngOnInit(): void {
  }

  onClickOpenCloseSidebar(){
    this.isSidebarOpen = !this.isSidebarOpen
    this.sidebarService.sidebarOpened.next(this.isSidebarOpen);
  }

}
