import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { WordCountService } from '../services/word-count.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  formHandler: FormGroup;
  dataURL = 'https://random-data-api.com/api/restaurant/random_restaurant';
  apiCallProgress = false;
  apiCallInvalid = false;
  wordList: any;
  wordCount: any;
  numberOfWords: number;
  wordGroupCount: number[];
  wordCounterLoading = false;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private wcs: WordCountService) {
    this.wordGroupCount = [10];
    this.numberOfWords=0;
  }

  ngOnInit() {
    this.formHandler = this.formBuilder.group({
      textControl: ['', Validators.required],
    });
    this.wordCount = 10;
  }

  grabData() {
    this.apiCallProgress = true;
    this.apiCallInvalid = false;
    this.formHandler.value.textControl = '';
    this.numberOfWords = 0;
    this.api.grabText(this.dataURL).subscribe((result) => {
      if (result.hasOwnProperty('description')) {
        this.formHandler.patchValue({ textControl: result.description });
        this.apiCallInvalid = false;
        this.apiCallProgress = false;

      } else {
        this.apiCallInvalid = true;
        this.apiCallProgress = false;

      }
    }, (error) => {
      this.apiCallInvalid = true;
      this.apiCallProgress = false;

    });
  }

  doSubmit(f: any) {
    this.wcs.countWords(f.textControl).then(res => {
      if (res) {
        this.showWordCount(true);
      };
    });
  };

  showWordCount(bool: boolean) {
    this.wordCounterLoading = true;
    setTimeout(() => {
      this.wordList = this.wcs.getWordList(this.wordCount);
      this.numberOfWords = this.wcs.getTotalWordLength();
      let step = ~~(this.numberOfWords/10);
      this.wordGroupCount = Array.from({ length: step }, (_, i) => (i+1)*10);
      if (this.numberOfWords % 10 !== 0) {
        this.wordGroupCount.push(this.numberOfWords);
      }
      if (bool) this.wordCount = this.wordGroupCount[0];
      this.wordCounterLoading = false;
    }, 500);

  }
}
