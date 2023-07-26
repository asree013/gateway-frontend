import { TestBed } from '@angular/core/testing';

import { AccoutsService } from './accouts.service';

describe('AccoutsService', () => {
  let service: AccoutsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccoutsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
