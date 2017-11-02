"use strict";

var isValue    = require("es5-ext/object/is-value")
  , startsWith = require("es5-ext/string/#/starts-with");

module.exports = function (key) {
	if (!isValue(key)) return false;
	return startsWith.call(key, "n\0");
};
