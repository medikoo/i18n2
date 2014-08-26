'use strict';

var startsWith = require('es5-ext/string/#/starts-with');

module.exports = function (key) {
	if (key == null) return false;
	return startsWith.call(key, 'n\0');
};
