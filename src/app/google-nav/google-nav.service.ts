import { Injectable } from '@angular/core';
import { CamelizePipe } from 'ngx-pipes';
import {of as observableOf,  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleNavService {
  private geoCoder;
  private locationCache: any = {};

  constructor(private camelizePipe: CamelizePipe) { }
  private camelize(value: string): string {
    return this.camelizePipe.transform(value);
  }

  private cacheLocation(location: string, coordinates: any) {
    this.locationCache[this.camelize(location)] = coordinates;
  }

  private isLocationCached(location): boolean {
    return this.locationCache[this.camelize(location)];
  }

  private geocodeLocation(location: string): Observable<any> {
    console.log('26');
    if (!this.geoCoder) {
      console.log('28');
      this.geoCoder = new (<any>window).google.maps.Geocoder();
      console.log('30', this.geoCoder);
    }

    return new Observable((observer) => {
      console.log('34');
      this.geoCoder.geocode({address: location}, (result, status) => {
        console.log(status, '36');
        if (status === 'OK') {

          const geometry = result[0].geometry.location;
          console.log(geometry, '40');
          const coordinates = {lat: geometry.lat(), lng: geometry.lng()};
          console.log(coordinates, '42');

          this.cacheLocation(location, coordinates);
          observer.next(coordinates);
        } else {
          observer.error('Location could not be geocoded');
        }
      });
    });
  }

  public getGeoLocation(location: string): Observable<any> {

    if (this.isLocationCached(location)) {
      return observableOf(this.locationCache[this.camelize(location)]);
    } else {
      return this.geocodeLocation(location);
    }
  }
}
