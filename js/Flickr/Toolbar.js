dojo.provide('Flickr.Toolbar');

dojo.require('dijit._Widget');

(function(d) {
	dojo.declare('Flickr.Toolbar', [ dijit._Widget ], {
		postCreate : function() {
			// enable add and remove buttons
			this.connect(d.byId('addlist'), 'click', '_addList');
			this.connect(d.byId('removelist'), 'click', '_removeList');
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
