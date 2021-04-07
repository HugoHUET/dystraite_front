import { TestBed } from '@angular/core/testing';

import { MaximotsService } from './maximots.service';

describe('MaximotsService', () => {
  let service: MaximotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaximotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
