'use strict';

module.exports = function (t, a) {
	var message = t('raz ${foo} bar ${bar} mis ${bar2}',
		{ foo: 'elo', bar: 1, bar2: 2 });
	a.deep(message, ['raz ', 'elo', ' bar ', 1, ' mis ', 2, '']);
	a(String(message), "raz elo bar 1 mis 2", "Stringified");
};
