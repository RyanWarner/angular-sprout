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

I still have many questions to answer and best practices to discover, and when I do, this repo will be updated with my findings.

## Stack

What defining tools and libraries make up this project's architecture?

#### Front-end framework
- [Angular](https://angularjs.org/) with [AngularUI Router](https://github.com/angular-ui/ui-router)

#### Preprocessors
- [Jade](http://jade-lang.com/)
- [Sass](http://sass-lang.com/) with [autoprefixer](https://github.com/postcss/autoprefixer-core).

#### Build System
- [Gulp](http://gulp.com/)

## Local Setup

### Prerequisites
1. [Homebrew](http://brew.sh/)
	- `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
	- `brew update`
	- `brew doctor`
	- `open ~./bash_profile`
	- Add `export PATH="/usr/local/bin:$PATH"` to your bash profile and save it.
1. [NodeJS](http://nodejs.org/)
	- `brew install node`
1. [Bower](http://bower.io/)
	- `npm install --global bower`
1. [Gulp](http://gulp.com/)
	- `npm install --global gulp`
1.	[scss-lint](https://github.com/causes/scss-lint)
	- `gem install scss-lint`

### Start Up

1. `npm install`
2. `bower install`
2. `gulp`


## File Structure

```
app/
	common-components/
		directives/
			dropdown/
				_dropdown_styles.scss
				dropdown_controller.js
				dropdown_directive.js
				dropdown_template.jade
		filters/
			reverse_filter.js
		services/
	common-styles/
		_base.scss
		_breakpoints.scss
		_mixins.scss
		_reset.scss
		_variables.scss
	states/
		root/
			parent-state-2/
				child-state-1/
					_child-state-1_styles.scss
					child-state-1_controler.js
					child-state-1_module.js
					child-state-1_template.jade
					child-state-1_test-e2e.js
					child-state-1_test-unit.js
				child-state-2/
					_child-state-2_styles.scss
					child-state-2_controler.js
					child-state-2_module.js
					child-state-2_template.jade
					child-state-2_test-e2e.js
					child-state-2_test-unit.js
				_parent-state-2_styles.scss
				parent-state-2_controler.js
				parent-state-2_module.js
				parent-state-2_template.jade
				parent-state-2_test-e2e.js
				parent-state-2_test-unit.js
			state-1/
				_state-1_styles.scss
				state-1_controller.js
				state-1_module.js
				state-1_template.jade
				state-1_test-e2e.js
				state-1_test-unit.js
	app_module.js
	app_styles.scss
	index.jade
bower_components/
build/
images/
node_modules/
tests/
	coverage/
	karma.config.js
	protractor.config.js
.csscomb.json
.eslintrc
.gitignore
.htaccess
bower.json
favicon.png
gulpfile.js
LICENSE
package.json
README.md
scss-linting-config.yml
```


## Tests

Unit tests make code robust and easy to change. The [mocha framework](http://mochajs.org/) was chosen for its modularity, flexibility, and node.js proficiency.

#### Unit Tests

Unit tests define the applications API. Take some time to read [An Introduction To Unit Testing In AngularJS Applications](http://www.smashingmagazine.com/2014/10/07/introduction-to-unit-testing-in-angularjs/).

- [Karma](http://karma-runner.github.io/)
- [Mocha](http://mochajs.github.io/mocha/)
- [Sinon-Chai](https://github.com/domenic/sinon-chai)

`gulp unit-tests`

#### End to End

End to end tests interact with your interface the same way a user would, in a browser. Try the [protractor tutorial](http://angular.github.io/protractor/#/tutorial).

- [Protractor](https://github.com/angular/protractor)
- Make sure you have a [Java runtime environment installed](http://support.apple.com/kb/DL1572)

`gulp e2e-tests`

## Build Process

`gulp build`

Building does a number of things:

1. Cleans the build directory by removing all files using [del](https://www.npmjs.org/package/del).
2. Minifies all images using [gulp-imagemin](https://www.npmjs.org/package/gulp-imagemin).
3. Injects Angular dependancy annotations using [ng-annotate](https://github.com/olov/ng-annotate).
4. Concatenates and minifies all JavaScript files using [gulp-concat](https://www.npmjs.org/package/gulp-concat) and [gulp-uglify](https://github.com/terinjokes/gulp-uglify).
5. Concatenates and minifes all stylesheets using [gulp-minify-css](https://github.com/jonathanepollack/gulp-minify-css).
6. Minifies HTML using [gulp-minify-html](https://github.com/jonathanepollack/gulp-minify-html).

## Coding Style

angular-sprout uses [squint-style](https://github.com/RyanWarner/squint-style).

### File Naming Conventions

`[ state-name ] _ [ type ] . [ file extension ]`

```
home-state_controller.js
home-state_module.js
home-state_styles.scss
home-state_template.jade
home-state_test-unit.js
```

Use hyphens for state or component names. Tag the end of each file with an underscore followed by the specific function of the file.

## Other Angular Boilerplates

- [angular-seed](https://github.com/angular/angular-seed)
- [nghellostyle](https://github.com/zemirco/nghellostyle)
- [ngbp](http://joshdmiller.github.io/ng-boilerplate/#/home)

## Further Reading

- [Angular App Structure Best Practices](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/mobilebasic?pli=1)
- [AngularJS Style Guide for Closure](https://google-styleguide.googlecode.com/svn/trunk/angularjs-google-style.html#googprovide)