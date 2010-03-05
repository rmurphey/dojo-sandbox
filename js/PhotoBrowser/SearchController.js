dojo.provide('PhotoBrowser.SearchController');

dojo.require('dijit._Widget');
dojo.require('dijit.layout.ContentPane');
dojo.require('PhotoBrowser.SearchTerm');

(function(d) {
	dojo.declare('PhotoBrowser.SearchController', [ dijit.layout.ContentPane ], {
		terms : {},
		
		postCreate : function() {
			this.inherited(arguments);
			
			// find any terms that were included in html and create SearchTerm widgets for them
			var lastTerm;
			
			d.query('li', this.domNode).forEach(function(el) {
				var term = el.innerHTML;
				this._makeNewTerm(term, el);
				lastTerm = term;
			}, this);
			
			// if any existing terms were added, show the last one
			this.terms[lastTerm] && d.publish('/term/show', [ lastTerm ]);
			
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
			// if no term is provided to remove, remove all active terms			
			if (!term) {
				for (var t in this.terms) {
					if (this.terms.hasOwnProperty(t)) {
						this.terms[t].active && this.terms[t].destroy();
					}
				}
				d.publish('/results/clear');
				return;
			}
			
			// if a term is provided and there is no widget for it, bail
			if (!this.terms[term]) { return; }
			
			// otherwise, find the widget for the term; if it's active, clear the results
			this.terms[term].active && d.publish('/results/clear');
			
			// then, destroy the widget for the term and remove it from the terms registry
			this.terms[term].destroy();
			this.terms[term] = false;
		}
	});
})(dojo);
