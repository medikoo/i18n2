'use strict';

module.exports = function (t, a) {
	var message, n = 0;
	message = t('raz %foo% bar %bar% mis %bar%', { foo: 'elo', bar: function () {
		return ++n;
	} });
	a.deep(message, ['raz ', 'elo', ' bar ', 1, ' mis ', 2]);
	a(String(message), "raz elo bar 1 mis 2", "Stringified");
};
