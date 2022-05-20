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
  apiCallInvalid: boolean = false;
  wordList: any;
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private wcs: WordCountService) {
  }

  ngOnInit() {
    this.formHandler = this.formBuilder.group({
      'textControl': [null, Validators.required],
    });
  }

  grabData() {
    this.api.grabText(this.dataURL).subscribe((result) => {
      if (result.hasOwnProperty('description')) {
        this.formHandler.patchValue({ 'textControl': result.description })
        this.apiCallInvalid = false;
      } else {
        this.apiCallInvalid = true;
      }
    }, (error) => {
      this.apiCallInvalid = true;
    });
  }

  doSubmit(f: any) {
    this.wcs.countWords(f.textControl).then(result => {
      if (result) {
        this.wcs.getWordList(10).then(result => {
          this.wordList = result;
        });
      }
    });
  }
}
