dojo.provide('Flickr.SearchTerm');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dojox.data.FlickrRestStore');

(function(d) {
	dojo.declare('Flickr.SearchTerm', [ dijit._Widget, dijit._Templated ], {
		templateString : '<h1>${term}</h1>',
		store : new dojox.data.FlickrRestStore(),
	
		constructor : function(config) {
			this.term = config.term;
		
			// set up the request object that will be used for this term
			this.request = {
				onComplete : d.hitch(this, '_handleResponse'),
				onError : d.hitch(this, '_handleError'),
				query : {
					apikey: "8c6803164dbc395fb7131c9d54843627",
					tags : this.term.split(' ').join(',')
				}
			};
		},

		postCreate : function() {
			// listen for instructions to show the term
			d.subscribe('/term/show', this, '_show');

			// send instructions to show the term when clicked
			this.connect(this.domNode, 'click', function() {
				d.publish('/term/show', [ this.term ]);
			});
		},

		_show : function(term) {
			// we can receive /term/show messages from any SearchTerm.
			// so, first, look to see if this one is related to this SearchTerm; 

			// if not, set this SearchTerm as inactive
			if (term != this.term) {
				this.active = false;
				d.removeClass(this.domNode, 'active');
				return;
			}
		
			// if so, is this SearchTerm already active? bail.
			if (d.hasClass(this.domNode, 'active')) { return; }

			// if this message was related to this SearchTerm,
			// and this SearchTerm isn't already active, make it
			// active and fetch the data; mark the SearchTerm
			// as loading in the meantime
			this.active = true;
			d.addClass(this.domNode, 'active');
		
			this.domNode.innerHTML = 'loading ...';
			this.store.fetch(this.request);
		},
	
		_handleResponse : function(items) {
			// unmark the SearchTerm as loading
			this.domNode.innerHTML = this.term;
			d.removeClass(this.domNode, 'loading');
		
			// publish the items received so they can be displayed
			// by another component
			d.publish('/items/show', [ items ]);
		},
	
		_handleError : function() {
			this.domNode.innerHTML = this.term;
			d.removeClass(this.domNode, 'loading');
			alert('uh oh!');
		}
	
	});
})(dojo);
