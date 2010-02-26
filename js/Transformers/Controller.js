dojo.provide('Transformers.Controller');

dojo.require('Transformers.Bot');
dojo.require('Transformers.Scoreboard');

(function(d) {
	dojo.declare('Transformers.Controller', null, {
		teams : [{
			team : 'autobot',
			evil : false,
			missiles : 1,
			guns : 5
		},
		{
			team : 'decepticon',
			evil : true,
			missiles : 3,
			guns : 1
		}],
		
		players : [],
		
		constructor : function() {
			new Transformers.Scoreboard({}).placeAt(dojo.body(), 'last');
			this._setup();			
			
			d.connect(d.byId('play'), 'click', this, '_play');
		},
		
		_setup : function() {
			d.forEach(this.teams, function(t) {
				this.players.push(new Transformers.Bot(t));
			}, this);
		},
		
		_play : function() {
			var rand = Math.random() > 0.5 ? 0 : 1;
			d.publish('/msg', [{
				msg : this.teams[rand].team + 's get to start'
			}]);
			
			d.publish('/' + this.teams[rand].team + '/play');
			d.publish('/' + this.teams[rand ? 0 : 1].team + '/play');
		}
	});
})(dojo);
