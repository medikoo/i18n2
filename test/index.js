'use strict';

module.exports = function (t) {
	var _ = t();

	return {
		"No data": function () {
			_.locale = null;
			return {
				"": function (a) {
					var result;
					a(_("foo"), "foo", "Regular");
					a.deep(result = _("foo ${bar} data ${melo} ${bar}", {
						bar: 'misa',
						melo: 'orer'
					}), ['foo ', 'misa', ' data ', 'orer', ' ', 'misa', '']);
					a(String(result), "foo misa data orer misa", "Inserts: stringified");
				},
				N: {
					"": function (a) {
						a(_("sin"), "sin", "One argument");
						a(_("sin", "plu", 1), "sin", "1");
						a(_("sin", "plu", 2), "plu", "2");
						a(_("sin", "plu", 20), "plu", "n");

						a.deep(_("sin ${foo}", "plu ${foo}", 1, { foo: 'bar' }),
							['sin ', 'bar', ''], "Inserts: Singular");
						a.deep(_("sin ${foo}", "plu ${foo}", 2, { foo: 'bar' }),
							['plu ', 'bar', ''], "Inserts: Plural");
					},
					Context: function (a) {
						a(_.call('bar', "sin"), "sin", "One argument");
						a(_.call('bar', "sin", "plu", 1), "sin", "1");
						a(_.call('bar', "sin", "plu", 2), "plu", "2");
						a(_.call('bar', "sin", "plu", 20), "plu", "n");

						a.deep(_.call('bar', "sin ${foo}", "plu ${foo}", 1,
							{ foo: 'bar' }), ['sin ', 'bar', ''], "Inserts: Singular");
						a.deep(_.call('bar', "sin ${foo}", "plu ${foo}", 2,
							{ foo: 'bar' }), ['plu ', 'bar', ''], "Inserts: Plural");
					}
				},
				Context: function (a) {
					var result;
					a(_.call('bar', "foo"), "foo", "Regular");
					a.deep(result = _.call('bar', "foo ${bar} data ${melo} ${bar}", {
						bar: 'misa',
						melo: 'orer'
					}), ['foo ', 'misa', ' data ', 'orer', ' ', 'misa', '']);
					a(String(result), "foo misa data orer misa", "Inserts: stringified");
				}
			};
		},
		Locale: function () {
			_.locale = {
				foo: 'elo',
				"foo ${bar} data ${melo} ${bar}": 'marek ${melo} sd ${bar}',
				"n\0sin\0plu": ['foo', 'marko'],
				"n\0sin ${foo}\0plu ${foo}": function (n) {
					return (n > 1) ? '${foo} was' : 'numi ${foo}';
				},
				'n\0marko\0elo': 'fisas'
			};
			return {
				"": function (a) {
					a(_("foo"), "elo", "Regular");
					a.deep(_("foo ${bar} data ${melo} ${bar}", {
						bar: 'misa',
						melo: 'orer'
					}), ['marek ', 'orer', ' sd ', 'misa', ''], "Inserts");
					a(_("none e"), "none e", "Not in locale");
				},
				N: {
					"": function (a) {
						a(_("sin"), "sin", "One argument");
						a(_("sin", "plu", 1), "foo", "1");
						a(_("sin", "plu", 2), "marko", "2");
						a(_("sin", "plu", 20), "marko", "n");

						a.deep(_("sin ${foo}", "plu ${foo}", 1, { foo: 'bar' }),
							['numi ', 'bar', ''], "Inserts: Singular");
						a.deep(_("sin ${foo}", "plu ${foo}", 2, { foo: 'bar' }),
							['', 'bar', ' was'], "Inserts: Plural");

						a.deep(_('marko', 'elo', 2, ''), 'fisas', "String resolved");
					},
					Context: function (a) {
						a(_.call('bar', "sin"), "sin", "One argument");
						a(_.call('bar', "sin", "plu", 1), "foo", "1");
						a(_.call('bar', "sin", "plu", 2), "marko", "2");
						a(_.call('bar', "sin", "plu", 20), "marko", "n");

						a.deep(_.call('bar', "sin ${foo}", "plu ${foo}", 1,
							{ foo: 'bar' }), ['numi ', 'bar', ''], "Inserts: Singular");
						a.deep(_.call('bar', "sin ${foo}", "plu ${foo}", 2,
							{ foo: 'bar' }), ['', 'bar', ' was'], "Inserts: Plural");
					}
				},
				Context: function (a) {
					a(_.call('bar', "foo"), "elo", "Regular");
					a.deep(_.call('bar', "foo ${bar} data ${melo} ${bar}", {
						bar: 'misa',
						melo: 'orer'
					}), ['marek ', 'orer', ' sd ', 'misa', ''], "Inserts");
				}
			};
		},
		"Default context": function () {
			_.locale = {
				foo: { default: 'elo' },
				"foo ${bar} data ${melo} ${bar}":
					{ default: 'marek ${melo} sd ${bar}' },
				"n\0sin\0plu": { default: ['foo', 'marko'] },
				"n\0sin ${foo}\0plu ${foo}": { default: function (n) {
					return (n > 1) ? '${foo} was' : 'numi ${foo}';
				} },
				'n\0marko\0elo': { default: 'fisas' }
			};
			return {
				"": function (a) {
					a(_("foo"), "elo", "Regular");
					a.deep(_("foo ${bar} data ${melo} ${bar}", {
						bar: 'misa',
						melo: 'orer'
					}), ['marek ', 'orer', ' sd ', 'misa', ''], "Inserts");
					a(_("none e"), "none e", "Not in locale");
				},
				N: {
					"": function (a) {
						a(_("sin"), "sin", "One argument");
						a(_("sin", "plu", 1), "foo", "1");
						a(_("sin", "plu", 2), "marko", "2");
						a(_("sin", "plu", 20), "marko", "n");

						a.deep(_("sin ${foo}", "plu ${foo}", 1, { foo: 'bar' }),
							['numi ', 'bar', ''], "Inserts: Singular");
						a.deep(_("sin ${foo}", "plu ${foo}", 2, { foo: 'bar' }),
							['', 'bar', ' was'], "Inserts: Plural");

						a.deep(_('marko', 'elo', 2), 'fisas', "String resolved");
					},
					Context: function (a) {
						a(_.call('bar', "sin"), "sin", "One argument");
						a(_.call('bar', "sin", "plu", 1), "foo", "1");
						a(_.call('bar', "sin", "plu", 2), "marko", "2");
						a(_.call('bar', "sin", "plu", 20), "marko", "n");

						a.deep(_.call('bar', "sin ${foo}", "plu ${foo}", 1,
							{ foo: 'bar' }), ['numi ', 'bar', ''], "Inserts: Singular");
						a.deep(_.call('bar', "sin ${foo}", "plu ${foo}", 2,
							{ foo: 'bar' }), ['', 'bar', ' was'], "Inserts: Plural");
					}
				},
				Context: function (a) {
					a(_.call('bar', "foo"), "elo", "Regular");
					a.deep(_.call('bar', "foo ${bar} data ${melo} ${bar}", {
						bar: 'misa',
						melo: 'orer'
					}), ['marek ', 'orer', ' sd ', 'misa', ''], "Inserts");
				}
			};
		},
		"Special context": function () {
			_.locale = {
				foo: { default: 'elo', bar: 'marko' },
				"foo ${bar} data ${melo} ${bar}": {
					default: 'marek ${melo} sd ${bar}',
					bar: 'marek ${melo} sd ${bar} habla'
				},
				"n\0sin\0plu": { default: ['foo', 'marko'], bar: ['fofo', 'efe' ] },
				"n\0sin ${foo}\0plu ${foo}": { default: function (n) {
					return (n > 1) ? '${foo} was' : 'numi ${foo}';
				}, bar: function (n) {
					return (n > 1) ? '${foo} wasdd' : 'numid ${foo}';
				} },
				'n\0marko\0elo': { default: 'fisas', bar: 'msdfsw' }
			};
			return {
				"": function (a) {
					a(_("foo"), "elo", "Regular");
					a.deep(_("foo ${bar} data ${melo} ${bar}", {
						bar: 'misa',
						melo: 'orer'
					}), ['marek ', 'orer', ' sd ', 'misa', ''], "Inserts");
					a(_("none e"), "none e", "Not in locale");
				},
				N: {
					"": function (a) {
						a(_("sin"), "sin", "One argument");
						a(_("sin", "plu", 1), "foo", "1");
						a(_("sin", "plu", 2), "marko", "2");
						a(_("sin", "plu", 20), "marko", "n");

						a.deep(_("sin ${foo}", "plu ${foo}", 1, { foo: 'bar' }),
							['numi ', 'bar', ''], "Inserts: Singular");
						a.deep(_("sin ${foo}", "plu ${foo}", 2, { foo: 'bar' }),
							['', 'bar', ' was'], "Inserts: Plural");

						a.deep(_('marko', 'elo', 2), 'fisas', "String resolved");
					},
					Context: function (a) {
						a(_.call('bar', "sin"), "sin", "One argument");
						a(_.call('bar', "sin", "plu", 1), "fofo", "1");
						a(_.call('bar', "sin", "plu", 2), "efe", "2");
						a(_.call('bar', "sin", "plu", 20), "efe", "n");

						a.deep(_.call('bar', "sin ${foo}", "plu ${foo}", 1,
							{ foo: 'bar' }), ['numid ', 'bar', ''], "Inserts: Singular");
						a.deep(_.call('bar', "sin ${foo}", "plu ${foo}", 2,
							{ foo: 'bar' }), ['', 'bar', ' wasdd'], "Inserts: Plural");
					}
				},
				Context: function (a) {
					a(_.call('bar', "foo"), "marko", "Regular");
					a.deep(_.call('bar', "foo ${bar} data ${melo} ${bar}", {
						bar: 'misa',
						melo: 'orer'
					}), ['marek ', 'orer', ' sd ', 'misa', ' habla'], "Inserts");
				}
			};
		}
	};
};
