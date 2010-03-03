dojo.provide('PhotoBrowser.Toolbar');

dojo.require('dijit.layout.ContentPane');

(function(d) {
	dojo.declare('PhotoBrowser.Toolbar', [ dijit.layout.ContentPane, dijit._Templated ], {
		templatePath : dojo.moduleUrl('PhotoBrowser', 'templates/toolbar.html'),

		postCreate : function() {
			this.inherited(arguments);
			// enable add and remove buttons
			this.connect(this.addSearch, 'click', '_addList');
			this.connect(this.removeSearch, 'click', '_removeList');
		},
		
		_addList : function(e) {
			e.preventDefault();
			// prompt the user to enter a tag; then, publish the addition
			// so that another component can handle it -- remember, we're
			// just a lowly toolbar
			var term = prompt('Enter a tag to search Flickr for photos', '');
			if (!term) { return; }
			d.publish('/term/add', [ term ]);
		},
		
		_removeList : function(e) {
			e.preventDefault();
			// publish the removal so another component can handle it
			d.publish('/term/remove');
		}
	});
})(dojo);
