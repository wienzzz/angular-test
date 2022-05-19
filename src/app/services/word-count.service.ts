import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordCountService {
  wordCounterContainer: any[];
  constructor() { }

  countWords(bodyText: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let _array = [];
      bodyText.trim().replace(/  +/g, ' ').toLowerCase().split(" ").filter((v, i, a) => a.indexOf(v) === i).forEach((wd) => {
        let cleanwd = wd.replace(/\W+$/gi, "");
        let occ = 0;
        if (cleanwd.match(RegExp('\\w+'))) {
          if (bodyText.toLowerCase().match(RegExp('\\b' + cleanwd + '\\b', "gi")) === null) occ = 0;
          else occ = bodyText.toLowerCase().match(RegExp('\\b' + cleanwd + '\\b', "gi")).length;
          _array.push({ word: wd, occurence: occ });
          _array.sort((a, b) => {
            return b.occurence - a.occurence;
          });
        }
        else {

        }
        this.wordCounterContainer = _array.slice(0, 10);
      })
      resolve(this.wordCounterContainer);
    });

  }

  getWordCounter() {
    return this.wordCounterContainer;
  }
}
