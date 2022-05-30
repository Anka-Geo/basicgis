import { SidebarService } from './../services/sidebar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bg-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  display  = false;
  constructor(public sidebarService : SidebarService) { }

  ngOnInit(): void {

    this.sidebarService.sidebarOpened.subscribe(res => {
      console.log(res);
      
      this.display = res;
    })
  }

}
