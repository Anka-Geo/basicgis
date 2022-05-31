import { ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  services: ReplaySubject<any> = new ReplaySubject()

  constructor(private http: HttpClient) {
    this.getLayers()
  }

  getLayers() {
    this.http.get('https://dev-gis.ankageo.com/rest/v1/services').subscribe({
      next: (layers: any) => { //todo
        this.services.next(layers.services.services)
      },
      error: (err) => { console.warn(err) }
    })
  }
}
