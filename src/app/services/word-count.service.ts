import { Injectable } from '@angular/core';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class WordCountService {
  wordCounterContainer: any[] = [];
  constructor() { }

  countWords(bodyText: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (bodyText.length === 0 || !bodyText) {
        reject(false);
      }

      let _array = [];
      bodyText.trim().replace(/  +/g, ' ').toLowerCase().split(" ").filter((v, i, a) => a.indexOf(v) === i).forEach((word) => {
        let _cleanword = word.replace(/\W+$/gi, "");
        let _occurence = 0;
        if (_cleanword.match(RegExp('\\w+'))) {
          let _check = bodyText.toLowerCase().match(RegExp(`(^|\\s+|)${_cleanword}(\\s|[.,]+|\$)`, "gi"));
          if (!_check) _occurence = 0;
          else _occurence = _check.length;

          !_array.some(i => i.word == _cleanword) && _array.push({ word: _cleanword, occurence: _occurence });
        }
      });

      _array.sort((a, b) => {
        return b.occurence - a.occurence;
      });
      this.wordCounterContainer = _array;

      resolve(true);
    });
  }

  getWordList(_num: number) {
    if (_num <= 0) return [];
    else return this.wordCounterContainer.slice(0,_num);
  }

  getTotalWordLength() {
    return this.wordCounterContainer.length;
  }
}
