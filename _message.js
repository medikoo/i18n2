'use strict';

var mixin          = require('es5-ext/object/mixin')
  , setPrototypeOf = require('es5-ext/object/set-prototype-of')
  , d              = require('d')
  , compile        = require('es6-template-strings/compile')
  , resolve        = require('es6-template-strings/resolve-to-array')

  , resolveOpts = { partial: true };

var Message = module.exports = function (template, inserts) {
	var message = resolve(compile(template), inserts, resolveOpts);
	if (setPrototypeOf) return setPrototypeOf(message, Message.prototype);
	return mixin(message, Message.prototype);
};

Message.prototype = [];
Object.defineProperties(Message.prototype, {
	constructor: d(Message),
	toString: d(function () { return this.join(''); })
});
