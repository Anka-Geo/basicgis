import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  sidebarOpened : Subject<boolean> = new Subject();

  constructor() { }
}
