'use strict';

var pluralKey = require('./valid-plural-key');

module.exports = function (key) {
	var index;
	key = pluralKey(key);
	index = key.indexOf('\0', 2);
	return [key.slice(2, index), key.slice(index + 1)];
};
