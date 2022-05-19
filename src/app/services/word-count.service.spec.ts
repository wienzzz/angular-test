import { TestBed } from '@angular/core/testing';

import { WordCountService } from './word-count.service';

describe('WordCountService', () => {
  let service: WordCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WordCountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
