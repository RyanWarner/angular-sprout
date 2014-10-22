# angular-sprout

An opinionated starting point for AngularJS web applications. 

Why? What's wrong with existing seeds like [nghellostyle](https://github.com/zemirco/nghellostyle), the official [angular-seed](https://github.com/angular/angular-seed), or [ngbp](https://github.com/ngbp/ngbp)? Nothing, really. In fact, I learned an incredible amount from all of the above, and copied the important stuff like:
- [Grouping everything in 'states' and 'components'](https://github.com/zemirco/nghellostyle#everything-is-grouped-in-states-and-components).
- Giving each state its own module and controller.
- ['controller as' syntax](https://github.com/zemirco/nghellostyle#controller-as-syntax) for more specific data binding.

However, I found a number of things I wanted to change, add, or remove. Enough that I found it worthy of creating my own seed.

- I want to use [Gulp](http://gulp.com/).
- I use my own [coding style](http://squint-style.guide), which uses different linters (eslint and scss-lint with csscomb).
- I want [Jade](http://jade-lang.com/) and [Sass](http://sass-lang.com/) out of the box.
- I don't want any CSS frameworks or grids, just a custom, minimal [reset & starting point](https://github.com/RyanWarner/sass-seed).

### A work in progress.

This project is incomplete. I'm still learning, and I know this seed is missing features.

Would it be smart to use [Closure Compiler](https://developers.google.com/closure/compiler/)? Or maybe [ng-annotate](https://github.com/olov/ng-annotate) with [uglifyjs](https://github.com/mishoo/UglifyJS2)?

I still have many questions to answer and best practices to discover, and when I do, this repo will be updated with my findings.

## Stack

- [Angular](https://angularjs.org/) with [AngularUI Router](https://github.com/angular-ui/ui-router)
- [Jade](http://jade-lang.com/)
- [Sass](http://sass-lang.com/)
- [Gulp](http://gulp.com/)

## Local Setup

### Prerequisites
1. [Homebrew](http://brew.sh/)
	- `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
1. [NodeJS](http://nodejs.org/)
	- `brew install node`
1. [Gulp](http://gulp.com/)
	- `npm install --global gulp`

### Start Up

1. `npm install`
2. `bower install`
2. `gulp`

## Tests

### Test Suite

#### Unit Tests

- [Karma](http://karma-runner.github.io/)
- [Mocha](http://mochajs.github.io/mocha/)
- [Sinon-Chai](https://github.com/domenic/sinon-chai)

#### End to End

**To do**: learn to use [protractor](https://github.com/angular/protractor) and create a Gulp task using [gulp-protractor](https://github.com/mllrsohn/gulp-protractor)



### Running Tests

`gulp tests`

## Coding Style

[squint-style](https://github.com/RyanWarner/squint-style)

### File Naming Conventions

`[ parent-name ] . [ child-name ] _ [ type ] . [ file extension ]`

```
home-page.about_module.js
home-page.about_controller.js
home-page.about_tests.js
home-page.about_template.jade
```
Use hyphens for state or component names, with child states separated by periods. Tag the end of each file with an underscore followed by the specific function of the file.

## Further Reading

- [Angular App Structure Best Practices](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/mobilebasic?pli=1)
- [angular-seed](https://github.com/angular/angular-seed)
- [nghellostyle](https://github.com/zemirco/nghellostyle)
- [ngbp](http://joshdmiller.github.io/ng-boilerplate/#/home)
- [AngularJS Style Guide for Closure](https://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html#googprovide)