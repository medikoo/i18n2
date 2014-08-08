'use strict';

var esniff = require('esniff/function'), clearRaw, prepareResult;

clearRaw = function (raw) {
	return raw.replace(/^("|')/, '').replace(/("|')$/, '');
};

prepareResult = function (funName, fileContent, result) {
	var clearKey, occurances;
	occurances = esniff(funName)(fileContent);
	occurances.forEach(function (o) {
		clearKey = clearRaw(o.raw);
		if (result.messages[clearKey]) {
			result.messages[clearKey].push(o);
		} else {
			result.messages[clearKey] = [o];
		}
		delete o.raw;
	});
	return result;
};

module.exports = function (fileContent) {
	var context, result = {};
	context = fileContent.match(/i18n\.bind\((.*?)\)/);
	if (context && context[1]) {
		context = clearRaw(context[1]);
	}
	result.context = context || '';
	result.messages = {};
	result = prepareResult('_', fileContent, result);
	result = prepareResult('_n', fileContent, result);

	return JSON.stringify(result);
};
