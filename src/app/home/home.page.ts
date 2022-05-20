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
  dataURL: string = "https://random-data-api.com/api/restaurant/random_restaurant";
  apiCallProgress: boolean = false;
  apiCallInvalid: boolean = false;
  wordList: any;
  wordCount: any;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private wcs: WordCountService) {
  }

  ngOnInit() {
    this.formHandler = this.formBuilder.group({
      'textControl': [null, Validators.required],
    });
    this.wordCount="10";
  }

  grabData() {
    this.apiCallProgress = true;
    this.apiCallInvalid = false;
    this.formHandler.controls
    this.api.grabText(this.dataURL).subscribe((result) => {
      if (result.hasOwnProperty('description')) {
        this.formHandler.patchValue({ 'textControl': result.description })
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
        this.showWordCount();
      };
    });
  };

  showWordCount() {
    this.wcs.getWordList(this.wordCount).then(result => {
      this.wordList = result;
    });
  }
}
