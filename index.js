"use strict";

var toPosInt = require("es5-ext/number/to-pos-integer")
  , firstKey = require("es5-ext/object/first-key")
  , isValue  = require("es5-ext/object/is-value")
  , value    = require("es5-ext/object/valid-value")
  , d        = require("d")
  , Message  = require("./_message");

var isArray = Array.isArray, defineProperties = Object.defineProperties;

module.exports = function (locale) {
	var self, resolve;
	self = function (keyS/*, keyP, n, inserts*/) {
		var inserts, template, keyP, key, pluralCount, msg;
		keyS = String(value(keyS)).trim();
		if (arguments.length > 2) {
			// Plural
			inserts = Object(arguments[3]);
			keyP = String(value(arguments[1])).trim();
			key = "n\0" + keyS + "\0" + keyP;
			pluralCount = toPosInt(arguments[2]);
			template = resolve.call(this, key, pluralCount);
			if (template === key) template = pluralCount > 1 ? keyP : keyS;
			// eslint-disable-next-line id-length
			inserts.n = pluralCount;
		} else {
			inserts = arguments[1];
			template = resolve.call(this, keyS);
		}
		if (!inserts) return template;
		msg = new Message(template, inserts);
		if (msg.length === 1) return msg[0];
		return msg;
	};
	// eslint-disable-next-line max-statements
	resolve = function (key, pluralCount) {
		var db = self.locale, context, template, isMulti;
		if (!db) return key;
		db = db[key];
		if (!isValue(db)) return key;
		if (typeof db === "string") return db;
		isMulti = isValue(pluralCount);
		if (isMulti && typeof db === "function") return db(pluralCount);
		if (!isMulti || !isArray(db)) {
			context = !isValue(this) || this === self ? "default" : this;
			if (isValue(db[context])) {
				template = db[context];
			} else if (isValue(db.default)) {
				template = db.default;
			} else {
				context = firstKey(db);
				if (!isValue(context)) return key;
				template = db[context];
			}
		} else {
			template = db;
		}
		if (!isMulti) return String(template);
		if (typeof template === "function") return template(pluralCount);
		if (isArray(template)) {
			if (pluralCount) --pluralCount;
			while (pluralCount && !isValue(template[pluralCount])) --pluralCount;
			if (isValue(template[pluralCount])) return template[pluralCount];
			return key;
		}
		return String(template);
	};

	return defineProperties(self, {
		locale: d(locale),
		_: d(self)
	});
};
