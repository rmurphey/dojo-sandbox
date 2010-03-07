dojo.provide('PhotoBrowser.SearchTerm');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('dojox.data.FlickrRestStore');

(function(d) {
    
	d.declare('PhotoBrowser.SearchTerm', [ dijit._Widget, dijit._Templated ], {
		templateString : '<li>${term} <span class="remove">x</span></li>',
		store : new dojox.data.FlickrRestStore(),
	
		constructor : function(config) {
			this.active = false;
			this.term = config.term;
			this.request = this._buildRequest();
		},

		postCreate : function() {
			// listen for instructions to show the term
			d.subscribe('/term/show', this, '_show');
			
			this.connect(this.domNode, 'click', '_handleClick');
		},
		
		_handleClick : function(e) {
			if (d.hasClass(e.target, 'remove')) {
				d.publish('/term/remove', [ this.term ]);
				return;
			}
			
			d.publish('/term/show', [ this.term ]);
		},
		
		_buildRequest : function() {
			return {
				onComplete : d.hitch(this, '_handleResponse'),
				onError : d.hitch(this, '_handleError'),
				query : {
					apikey: "8c6803164dbc395fb7131c9d54843627",
					tags : this.term.split(' ').join(',')
				}
			};
		},

		_show : function(term) {
			// we can receive /term/show messages from any SearchTerm.
			// so, first, look to see if this one is related to this SearchTerm; 

			// if not, set this SearchTerm as inactive
			if (term != this.term) {
				this.active = false;
				this.domNode && 
					d.removeClass(this.domNode, 'active') && 
					d.removeClass(this.domNode, 'loading');
				return;
			}
		
			// if so, is this SearchTerm already active? bail.
			if (d.hasClass(this.domNode, 'active')) { return; }
			
			this.active = true;

			// if this message was related to this SearchTerm,
			// and this SearchTerm isn't already active, make it
			// active and fetch the data; mark the SearchTerm
			// as loading in the meantime
			dojo.addClass(this.domNode, 'loading');
			this.store.fetch(this.request);
		},
	
		_handleResponse : function(items) {
			// unmark the SearchTerm as loading
			d.removeClass(this.domNode, 'loading');
			d.addClass(this.domNode, 'active');
		
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
