import { TestBed } from '@angular/core/testing';

import { AuthViewControllerService } from './auth-view-controller.service';

describe('AuthViewControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthViewControllerService = TestBed.get(AuthViewControllerService);
    expect(service).toBeTruthy();
  });
});
