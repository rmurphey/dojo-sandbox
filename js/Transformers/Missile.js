dojo.provide('Transformers.Missile');

dojo.require('Transformers._Weapon');

(function(d) {
	d.declare('Transformers.Missile', [ Transformers._Weapon ], {
		damage : 20,
		rounds : 1, 
		reload : 500,
		type : 'missile',
		
		constructor : function(bot) {
			if (bot.evil) {
				this.reload = this.reload / 2;
			}
		},
		
		_calculateRoundsToFire : function() {
			return Math.random() > 0.5 ? 1 : 0;
		}
	});
})(dojo);