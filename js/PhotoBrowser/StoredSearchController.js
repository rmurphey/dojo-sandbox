dojo.provide('PhotoBrowser.StoredSearchController');

dojo.require('PhotoBrowser.SearchController');
dojo.require('dojox.storage');

(function(d) {
	d.declare('PhotoBrowser.StoredSearchController', [ PhotoBrowser.SearchController ], {
		searches : [], // shared across all instances. do 'this.searches = []' in postCreate to have individuals
		localStore : 'searches',
		
		postCreate : function() {
			var lastTerm; 
			
			this.inherited(arguments);
			
			this.useStorage = true;
			this.searches = dojox.storage.get(this.localStore);
			
			if (this.searches && this.searches.length) {
				d.forEach(this.searches, function(term) {
					this.terms[term] || this._makeNewTerm(term);
					lastTerm = term;
				}, this);
			} else {
				this.searches = [];
			}
			
			this.terms[lastTerm] && d.publish('/term/show', [ lastTerm ]);
						
			d.subscribe('/term/add', this, '_addToStore');
			d.subscribe('/term/remove', this, '_removeFromStore');
			d.subscribe('/storage', this, '_toggleStorage');
		},
		
		_addToStore : function(term) {
			this.searches.push(term);
			this._store();
		},
		
		_store : function() {
			if (!this.useStorage) { return; }
			dojox.storage.put(this.localStore, this.searches, d.hitch(this, function(status, keyname) {
				if (status == dojox.storage.FAILED) {
					alert("You do not have permission to store data for this web site.");
				}
			}));			
		},
		
		_removeFromStore : function(term) {
			pos = d.indexOf(this.searches, term);
			if (pos > -1) {
				this.searches.splice(pos, 1);
				this._store();
			}
		},
		
		_toggleStorage : function(on) {
			this.useStorage = on;
			if (!on) {
				dojox.storage.clear();
			} else {
				this._store();
			}
		}
	});
})(dojo);