import { TestBed } from '@angular/core/testing';

import { TitreService } from './titre.service';

describe('TitreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitreService = TestBed.get(TitreService);
    expect(service).toBeTruthy();
  });
});
