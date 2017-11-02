[![Build status][circleci-image]][circleci-url]
[![Build status][appveyor-image]][appveyor-url]
[![Tests coverage][codecov-image]][codecov-url]
![Transpilation status][transpilation-image]
[![npm version][npm-image]][npm-url]

# i18n2

## Another gettext solution for JavaScript
### Installation

	$ npm install i18n2

### Usage

Once initialized, translation engine should be used across your application as a translator of your messages

```javascript

var I18n = require('i18n2');

// db (map of translations) is optional and can be provided at later step
var i18n = new I18n(db);

// By convention name for gettext translator function is `_`
var _ = i18n;
...
_("Hello World"); // Witaj Świecie!
```

#### Contexts

Different contexts can be assigned:

```javascript
var _ = i18n.bind('admin');

// Resolved in context of 'admin'
_("Hello World!"); // Admin: Witaj Świecie

```

#### Configuration of messages

##### Singular message: `_(msg[, inserts])`

Singular message can be plain:

```javascript
_("Hello World!"); // Witaj Świecie!
```

or filled with substitutions to replace:

```javascript
_("My name is ${firstName} ${lastName}", {
  firstName: "John",
  lastName: "Smith"
}); // Nazywam się John Smith
```

Substitutions syntax follows [ECMAScript's 6 template strings](http://www.2ality.com/2011/09/quasi-literals.html) format

##### Singular + plural message: _(singularMsg, pluralMsg, count[, inserts])

Singular and plural key, plus resolved count needs to be provided:

```javascript
_("${n} cat", "${n} cats", 1); // 1 kot
_("${n} cat", "${n} cats", 3); // 3 koty
_("${n} cat", "${n} cats", 5); // 5 kotów
```
Same way as in case of singular messages, inserts can be provided as fourth argument

#### Configuration of translations database

Configuration with no contexts (`default` context is assumed):

```javascript
var db = {
  "Hello World": "Witaj Świecie!"
};
```

With contexts


```javascript
var db = {
  "Hello World": {
    default: "Witaj Świecie!",
    admin: "Admin: Witaj Świecie!"
  }
};
```

##### Singular + plural messages

Key of such message is generated with following concatenation rule `key = 'n\0' + singularMsg + '\0' + pluralMsg`;

There are two ways of providing translations

###### with Array of options

```javascript
var db = {
  "\0${n} cat\0${n} cats": [
    "${n} kot",  // 1
    "${n} koty",,, // 2,3,4
    "${n} kotów" // 5+
  ]
};
```

###### with Function

In some languages (like Polish) resolving plurals is more tricky, the definite way can only be achieved with custom function:

```javascript
var db = {
  "\0${n} cat\0${n} cats": function (n) {
    if (n === 1) return "${n} kot";
    n = n % 100;
    if ((n > 4) && (n < 22)) return "${n} kotów";
    switch (n % 10) {
      case 2:
      case 3:
      case 4:
      return "${n} koty";
    }
    return "${n} kotów";
  }
};
```

### Tests [![Build Status](https://travis-ci.org/medikoo/i18n2.svg)](https://travis-ci.org/medikoo/i18n2)

	$ npm test

[circleci-image]: https://img.shields.io/circleci/project/github/medikoo/i18n2.svg
[circleci-url]: https://circleci.com/gh/medikoo/i18n2
[appveyor-image]: https://img.shields.io/appveyor/ci/medikoo/i18n2.svg
[appveyor-url]: https://ci.appveyor.com/project/medikoo/i18n2
[transpilation-image]: https://img.shields.io/badge/transpilation-free-brightgreen.svg
[npm-image]: https://img.shields.io/npm/v/i18n2.svg
[npm-url]: https://www.npmjs.com/package/i18n2
