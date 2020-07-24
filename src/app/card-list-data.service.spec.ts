import { TestBed } from '@angular/core/testing';

import { CardListDataService } from './card-list-data.service';

describe('CardListDataService', () => {
  let service: CardListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
