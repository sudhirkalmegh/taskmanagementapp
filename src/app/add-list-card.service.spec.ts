import { TestBed } from '@angular/core/testing';

import { AddListCardService } from './add-list-card.service';

describe('AddListCardService', () => {
  let service: AddListCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddListCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
