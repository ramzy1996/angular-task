import { TestBed } from '@angular/core/testing';

import { AllocateSubjectService } from './allocate-subject.service';

describe('AllocateSubjectService', () => {
  let service: AllocateSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllocateSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
