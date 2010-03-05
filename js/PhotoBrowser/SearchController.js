dojo.provide('PhotoBrowser.SearchController');

dojo.require('dijit._Widget');
dojo.require('dijit.layout.ContentPane');
dojo.require('PhotoBrowser.SearchTerm');

(function(d) {
	dojo.declare('PhotoBrowser.SearchController', [ dijit.layout.ContentPane ], {
		terms : {},
		
		postCreate : function() {
			this.inherited(arguments);
			
			// listen for instructions to add or remove terms from the list
			d.subscribe('/term/add', this, '_addTerm');
			d.subscribe('/term/remove', this, '_removeTerm');
		},
		
		_addTerm : function(term) {
			// check whether there's already a SearchTerm for the term
			if (this.terms[term]) { return; }
			
			// if not, create a new SearchTerm for it; then show it
			this._makeNewTerm(term);
			d.publish('/term/show', [ term ]);
		},
		
		_makeNewTerm : function(term, el) {
			this.terms[term] = new PhotoBrowser.SearchTerm({ term : term }, el).placeAt(this.domNode, 'last');
		},
		
		_removeTerm : function(term) {
			// if a term is provided and there is no widget for it, bail
			if (!this.terms[term]) { return; }
			
			// otherwise, find the widget for the term; if it's active, clear the results
			this.terms[term].active && d.publish('/results/clear');
			
			// then, destroy the widget for the term and remove it from the terms registry
			this.terms[term].destroy();
			console.log('destroyed', term);
			this.terms[term] = false;
		}
	});
})(dojo);
