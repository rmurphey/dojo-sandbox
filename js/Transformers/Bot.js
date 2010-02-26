dojo.provide('Transformers.Bot');

dojo.require('Transformers.Missile');
dojo.require('Transformers.Gun');

dojo.require('dojo.string');

(function(d) {
	d.declare('Transformers.Bot', null, {
		turnLength : 500,
		armMessage : 'Armed with ${missiles} missiles and ${guns} guns',
		initialHealth : 100,
		
		constructor : function(config) {
			this.config = config;
			this.health = this.initialHealth;
			this.team = [];
			
			d.publish('/msg', [{
				team : this.config.team,
				msg : d.string.substitute(this.armMessage, this.config)
			}]);
			
			while (this.config.missiles--) {
				new Transformers.Missile(this);
			}
			
			while (this.config.guns--) {
				new Transformers.Gun(this);
			}
			
			d.subscribe('/' + this.config.team + '/play', this, 'attack');
			d.subscribe('/firing', this, '_defend');

			d.subscribe('/' + this.config.team + '/join', this, '_addTeammate');
			d.subscribe('/endTurn', this, '_endTurn');
			
			d.publish('/' + this.config.team + '/join');
		},
		
		attack : function() {
			if (this.health <= 0) { return; }
			
			this.attacking = true;
			d.publish('/' + this.config.team + '/attack', [ this ]);
			
			this.timeout = setTimeout(d.hitch(this,function() {
				d.publish('/endTurn');
			}), this.turnLength);
		},
		
		_defend : function(attack) {
			/* ignore attacks from our own team */
			if (this.health <= 0) {
				this.timeout && clearTimeout(this.timeout);
				d.publish('/endTurn');
			}

			if (attack.bot.config.team == this.config.team) { return; }
			
			var damage = this._calculateDamage(attack);
			this.health = this.health - damage;
			
			d.publish('/healthUpdate', [ {
				team : this.config.team,
				health : this.health,
				damage : damage,
				msg : 'Damage report'
			} ]);
		},
		
		_calculateDamage : function(attack) {
			return Math.floor((attack.maxDamage * Math.random()) / (this.team.length));
		},
		
		_addTeammate : function(bot) {
			this.team.push(bot);
		},
		
		_endTurn : function() {
			!this.reported && d.publish('/status', [{
				health : this.health,
				msg : this.health > 0 ? 'Survived!' : 'Defeated!',
				team : this.config.team
			}]);
			
			this.reported = true;
			this.health = this.initialHealth;
		}
		
	});	
})(dojo);
