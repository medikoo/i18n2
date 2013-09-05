'use strict';

var d          = require('es5-ext/object/descriptor')
  , isCallable = require('es5-ext/object/is-callable')
  , compile    = require('es5-ext/string/#/template').compile

  , Message;

Message = module.exports = function (template, inserts) {
	var message = compile(template).map(function (str, i) {
		if (!(i % 2)) return str;
		return isCallable(inserts[str]) ? inserts[str]() : inserts[str];
	});
	if (!message[0]) message.shift();
	message.__proto__ = Message.prototype;

	return message;
};

Message.prototype = Object.create(Array.prototype, {
	constructor: d(Message),
	toString: d(function () { return this.join(''); })
});
