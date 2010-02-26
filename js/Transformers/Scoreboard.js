dojo.provide('Transformers.Scoreboard');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dojo.cache');

(function(d) {
	d.declare('Transformers.Scoreboard', [ dijit._Widget, dijit._Templated ], {
		templatePath : d.moduleUrl('Transformers', 'templates/scoreboard.html'),
		itemTemplate : d.cache('Transformers', 'templates/scoreboardItem.html'),

		postCreate : function(args) {
			d.subscribe('/healthUpdate', this, '_showUpdate');
			d.subscribe('/msg', this, '_showUpdate');
			d.subscribe('/status', this, '_showStatus');
			d.subscribe('/endTurn', this, function() {
				this.turnComplete || this._showUpdate({ msg : 'Turn complete' });
				this.turnComplete = true;
			});
		},
		
		_createItemTemplateObj : function(obj) {
			// make sure the object will have all the properties it needs
			return d.mixin({
				team : '',
				msg : '',
				damage : '',
				health : ''
			}, obj);
		},
		
		_showUpdate : function(obj) {
			if (this.turnComplete) { return; }
			var html = d.string.substitute(this.itemTemplate, this._createItemTemplateObj(obj));
			d.place(html, this.container, 'last');
		},
		
		_showStatus : function(obj) {
			var html = d.string.substitute(this.itemTemplate, this._createItemTemplateObj(obj));
			var status = d.place(html, this.container, 'last');
			d.addClass(status, 'status');
		}

	});	
})(dojo);