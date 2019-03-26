import { TestBed } from '@angular/core/testing';

import { UserFeedbackControllerService } from './user-feedback-controller.service';

describe('UserFeedbackControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserFeedbackControllerService = TestBed.get(UserFeedbackControllerService);
    expect(service).toBeTruthy();
  });
});
