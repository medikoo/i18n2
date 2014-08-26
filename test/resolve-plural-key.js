'use strict';

module.exports = function (t, a) {
	a.deep(t('n\0raz\0dwa'), ['raz', 'dwa']);
};
