import { TestBed } from '@angular/core/testing';

import { GoogleNavService } from './google-nav.service';

describe('GoogleNavService', () => {
  let service: GoogleNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
