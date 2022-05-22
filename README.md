# Simple Word Occurence Counter
## a word counter web-app based on Angular

![example workflow](https://github.com/wienzzz/angular-test>/actions/workflows/<WORKFLOW_FILE>/badge.svg)


This app is made using ionic-angular (simply angular wrapped within ionic framework) and meant to demonstrate :

- How to fiddle with angular reactive forms
- How to fiddle with regex to manipulate and process strings
- How to make call to external API using Angular Http Module
- How to create injectable service 
- How to perform simple unit testing

## Features

- Input your own sentence or grab data from external API
- Get occurence of each word on given sentence

## How To?
clone this repository and do npm install
```sh
git clone https://github.com/wienzzz/angular-test.git 
cd angular-test
npm install
```

after that perform 
```sh
ionic serve
```

or

```sh
ng serve
```

or simply visit this hosted link below
[Ulven Angular Test](https://www.google.com)
> Note that this app was made using ionic-angular framework

## Caveat
The term "word" could have various interpretation. For Sake of simplicity, I interpret word in a sentence this way :
- word is separated by space in a sentence
- trailing dot (.) and comma (,) are not considered as part of the word

## Development

Want to go further? Great!
Just fork this repo or put an issue/request/enhancement and I will try to get back to you as soon as possible :)

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

## Contribution Note
Thanks to [faaezahmd](https://codepen.io/faaezahmd/pen/dJeRex) for responsive tabular display using <ul> and <li> tag

## License
This repo is for private demo
