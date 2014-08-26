'use strict';

module.exports = function (t, a) {
	a(t(), false, "Undefined");
	a(t('raz'), false, "Singular");
	a(t('n\0raz\0dwa'), true, "Plural");
};
