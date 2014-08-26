'use strict';

var isPluralKey = require('./is-plural-key');

module.exports = function (key) {
	if (isPluralKey(key)) return String(key);
	throw new TypeError(key + " is not plural key");
};
