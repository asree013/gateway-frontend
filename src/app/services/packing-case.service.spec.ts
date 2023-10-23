import { TestBed } from '@angular/core/testing';

import { PackingCaseService } from './packing-case.service';

describe('PackingCaseService', () => {
  let service: PackingCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackingCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
