/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SignupListService } from './signup-list.service';

describe('Service: SignupList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignupListService]
    });
  });

  it('should ...', inject([SignupListService], (service: SignupListService) => {
    expect(service).toBeTruthy();
  }));
});
