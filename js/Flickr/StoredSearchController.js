dojo.provide('Flickr.StoredSearchController');

dojo.require('Flickr.SearchController');
dojo.require('dojox.storage');

(function(d) {
	d.declare('Flickr.StoredSearchController', [ Flickr.SearchController ], {
		storedSearches : [],
		localStore : 'storedSearches',
		
		constructor : function() {
			console.log('constructing');
		},

		postCreate : function() {
			this.inherited(arguments);
			
			this.storedSearches = dojox.storage.get(this.localStore);
			
			if (this.storedSearches && this.storedSearches.length) {
				d.forEach(this.storedSearches, function(term) {
					this.terms[term] || this._makeNewTerm(term);
				}, this);
			} else {
				this.storedSearches = [];
			}
			
			d.subscribe('/term/add', this, '_addToStore');
			d.subscribe('/term/remove', this, '_removeFromStore');
		},
		
		_addToStore : function(term) {
			this.storedSearches.push(term);
			dojox.storage.put(this.localStore, this.storedSearches, function(status, keyname) {
				if (status == dojox.storage.FAILED) {
					alert("You do not have permission to store data for this web site.");
				} else if (status == dojox.storage.SUCCESS) {
					console.log('storage success at ' + keyname);
				}
			});			
		},
		
		_removeFromStore : function(term) {
			pos = d.indexOf(term, this.storedSearches);
			(pos > -1) && this.storedSearches.splice(pos, 1);
			this._store();
		},
		
		_store : function() {
		}
		
	});
})(dojo);