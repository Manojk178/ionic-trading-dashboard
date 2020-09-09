import { Component, Input, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { GoogleNavService } from './google-nav.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-google-nav',
  templateUrl: './google-nav.component.html',
  styleUrls: ['./google-nav.component.scss'],
})
export class GoogleNavComponent implements OnInit, OnDestroy {
  @Input() location: string;

  @Input() locationSubject: Subject<any>;
  isPositionError = false;

  lat: number;
  lng: number;

  constructor(private googleNavService: GoogleNavService,
              private ref: ChangeDetectorRef ) { }

  ngOnInit() {
    if (this.locationSubject) {
      this.locationSubject.subscribe((location: string) => {
        this.getLocation(location);
      });
    }
  }

  ngOnDestroy() {
    if (this.locationSubject) {
      this.locationSubject.unsubscribe();
    }
  }

  getLocation(location) {
    console.log(location);
    this.googleNavService.getGeoLocation(location).subscribe(
        (coordinates) => {
          this.lat = coordinates.lat;
          this.lng = coordinates.lng;
          console.log('lat long', this.lat, this.lng);

          this.ref.detectChanges();
        }, () => {
          console.log('lat long error');
          this.isPositionError = true;
        });
  }
  mapReadyHandler() {
    this.getLocation(this.location);
  }

}
