import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { element } from 'protractor';
import { of } from 'rxjs';
import { ApiService } from '../services/api.service';
import { WordCountService } from '../services/word-count.service';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiService: ApiService;
  let wordCountService: WordCountService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule],
      providers: [ApiService, WordCountService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    apiService = TestBed.inject(ApiService);
    wordCountService = TestBed.inject(WordCountService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Function grabData', () => {
    it('expect grabData to call api and return observable and observable have property of Description ', () => {
      fixture.detectChanges();
      component.dataURL = "https://random-data-api.com/api/restaurant/random_restaurant";
      const response: any = { description: 'testing testing, testing.' };
      const _apiSpy = spyOn(apiService, 'grabText').withArgs(component.dataURL).and.callThrough();
      component.grabData();
      fixture.detectChanges();
      expect(_apiSpy).toHaveBeenCalledTimes(1);

      expect(component.apiCallProgress).toBeTrue;
      fixture.whenStable().then(() => {
        expect(component.apiCallInvalid).toBeFalse;
        expect(component.apiCallProgress).toBeFalse;
        expect(Object.keys(response)).toContain('description');
      });
    });

  });

  describe('Function doSubmit(form)', () => {
    it('expect form value to be submitted and call wordCount function once', () => {
      component.wordCount = 10;
      fixture.detectChanges();
      let mockForm: FormGroup = new FormGroup({ textControl: new FormControl('test') });
      let mockReturn = [{ word: 'a', occurence: 1 }, { word: 'b', occurence: 2 }];

      mockForm.patchValue({ textControl: 'testing' });
      spyOn(component, 'doSubmit').withArgs(mockForm).and.callThrough();
      console.log(mockForm.controls.textControl.value);
      const spyCountWords =  spyOn(wordCountService, 'countWords').withArgs(mockForm.controls.textControl.value).and.returnValue(Promise.resolve(true));
      spyOn(wordCountService, 'getWordList').withArgs(component.wordCount).and.returnValue(mockReturn);

      component.doSubmit(mockForm);
      wordCountService.countWords(mockForm.controls.textControl.value).then((value) => {
        const spyShowWordCount = spyOn(component, 'showWordCount').and.callThrough();

        component.showWordCount();

        expect(spyShowWordCount).toHaveBeenCalledTimes(1);

      });

      expect(true).toBeTruthy();
    });
  });

  describe('Function showWordCount()', () => {
    it('expect to copy array from word count service to wordList', () => {
      let mockReturn = [{ word: 'a', occurence: 1 }, { word: 'b', occurence: 2 }];
      spyOn(wordCountService, 'getWordList').withArgs(component.wordCount).and.returnValue(mockReturn);
      component.showWordCount();
      expect(component.wordList.length).toBeGreaterThan(0);
      expect(component.wordList).toEqual(mockReturn);
    });
  });
});
