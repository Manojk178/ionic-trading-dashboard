import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { GoogleNavComponent } from './google-nav.component';
import { GoogleNavService } from './google-nav.service';
import { CamelizePipe } from 'ngx-pipes';


@NgModule({
  declarations: [
      GoogleNavComponent
  ],
  exports: [
    GoogleNavComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
  ],
  providers: [
    GoogleNavService,
    CamelizePipe
  ]
})
export class GoogleNavModule { }
