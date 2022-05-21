import { TestBed } from '@angular/core/testing';
import { AngularDelegate } from '@ionic/angular';

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


  it('function countWords should accept text and return true and wordCounterContainer would be filled', async () => {
    const bodyText = "testing testing, testing.";
    spyOn(service,'countWords').withArgs(bodyText).and.callThrough();
    await service.countWords(bodyText).then((result) => {
      expect(result).toBeTrue;
      expect(service.wordCounterContainer.length).toBeGreaterThan(0);
    });
  });

  it('function getWordList should accept number greater than 0 and return maximum 10 length', () => {
    const numberOfWords = 10;
    expect(service.getWordList(numberOfWords)).toBeLessThanOrEqual(numberOfWords);
  });


  it('function getWordList should return error when number less than or equal to 0', () => {
    const numberOfWords = -1;
    expect(service.getWordList(numberOfWords)).toBeFalsy();
  });
});