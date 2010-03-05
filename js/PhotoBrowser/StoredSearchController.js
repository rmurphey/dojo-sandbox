dojo.provide('PhotoBrowser.StoredSearchController');

dojo.require('PhotoBrowser.SearchController');
dojo.require('dojox.storage');

(function(d) {
	d.declare('PhotoBrowser.StoredSearchController', [ PhotoBrowser.SearchController ], {
		storedSearches : [], // shared across all instances. do 'this.storedSearches = []' in postCreate to have individuals
		localStore : 'storedSearches',
		
		postCreate : function() {
			var lastTerm; 
			
			this.inherited(arguments);
			
			this.storedSearches = dojox.storage.get(this.localStore);
			
			if (this.storedSearches && this.storedSearches.length) {
				d.forEach(this.storedSearches, function(term) {
					this.terms[term] || this._makeNewTerm(term);
					lastTerm = term;
				}, this);
			} else {
				this.storedSearches = [];
			}
			
			this.terms[lastTerm] && d.publish('/term/show', [ lastTerm ]);
						
			d.subscribe('/term/add', this, '_addToStore');
			d.subscribe('/term/remove', this, '_removeFromStore');
			d.subscribe('/storage', this, '_toggleStorage');
		},
		
		_addToStore : function(term) {
			this.storedSearches.push(term);
			this._store();
		},
		
		_store : function() {
			dojox.storage.put(this.localStore, this.storedSearches, d.hitch(this, function(status, keyname) {
				if (status == dojox.storage.FAILED) {
					alert("You do not have permission to store data for this web site.");
				} else if (status == dojox.storage.SUCCESS) {
					console.log('storage success at ' + keyname, this.storedSearches);
				}
			}));			
		},
		
		_removeFromStore : function(term) {
			pos = d.indexOf(this.storedSearches, term);
			console.log('removing', term, this.storedSearches, pos);
			if (pos > -1) {
				this.storedSearches.splice(pos, 1);
				this._store();
				console.log('stored removal');
			}
		},
		
		_toggleStorage : function(on) {
			!on && dojox.storage.clear();
		}
	});
})(dojo);