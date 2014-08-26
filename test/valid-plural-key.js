'use strict';

module.exports = function (t, a) {
	a.throws(function () { t(); }, TypeError, "Undefined");
	a.throws(function () { t('raz'); }, TypeError, "Singular");
	a(t('n\0raz\0dwa'), 'n\0raz\0dwa', "Plural");
};
