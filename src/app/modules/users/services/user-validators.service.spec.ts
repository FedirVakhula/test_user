import { TestBed } from '@angular/core/testing';

import { UserValidatorsService } from './user-validators.service';

describe('UserValidatorsService', () => {
  let service: UserValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
