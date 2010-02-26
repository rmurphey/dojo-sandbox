dojo.provide('Transformers._Weapon');

dojo.require('dojo.string'); 

(function() {
	d.declare('Transformers._Weapon', null, {
		firingMessage : 'Firing ${rounds} rounds from a ${type} with maximum damage of ${maxDamage}',
		
		constructor : function(bot) {
			this.bot = bot;
			this.team = bot.config.team;
			this.disabled = false; 
			this.attacking = false;
			
			d.subscribe('/' + this.team + '/attack', this, function() {
				this.attacking = true;
				this._fire();
			});
			
			d.subscribe('/endTurn', this, '_endTurn');
		},
		
		_fire : function() {
			if (!this.rounds || this.disabled || !this.attacking) { 
				var msgs = [];
				
				if (!this.rounds) {
					msgs.push("Can't fire; out of ammunition");
				}
				
				if (this.disabled) {
					msgs.push("Can't fire; reloading");
				}
				
				d.forEach(msgs, function(msg) {
					d.publish('/msg', [{
						msg : msg,
						team : this.team
					}]);
				}, this);

				return;
			}
			
			this.disabled = true;
			var roundsToFire = this._calculateRoundsToFire(),
				maxDamage = this.damage * roundsToFire;
				
			if (!roundsToFire) { return; }
			
			d.publish('/msg', [{
				team : this.team,
				msg : d.string.substitute(this.firingMessage, {
					type : this.type,
					rounds : roundsToFire,
					maxDamage : maxDamage
				})
			}]);

			d.publish('/firing', [{
				bot : this.bot,
				maxDamage : maxDamage
			}]);
			
			this.rounds = this.rounds - roundsToFire;
			
			if (this.rounds && this.bot.attacking	) {	
				var wait = roundsToFire ? this.reload : this.reload / 10;
					
				this.timeout = setTimeout(d.hitch(this, function() {
					this.disabled = false;
					this._fire();
				}), wait);
			} 
		},
		
		_calculateRoundsToFire : function() {
			return Math.floor(Math.random() * this.rounds);
		},
		
		_endTurn : function() {
			this.attacking = false;
			this.disabled = false;
			this.timeout && clearTimeout(this.timeout);
		}
	});
})(dojo);
