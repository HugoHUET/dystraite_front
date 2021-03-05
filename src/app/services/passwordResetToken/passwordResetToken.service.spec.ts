import { TestBed } from '@angular/core/testing';

import { PasswordResetTokenService } from './passwordResetToken.service';

describe('PasswordResetTokenService', () => {
  let service: PasswordResetTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordResetTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
