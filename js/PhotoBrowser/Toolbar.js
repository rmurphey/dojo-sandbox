dojo.provide('PhotoBrowser.Toolbar');

dojo.require('dijit._Templated');
dojo.require('dijit.form.HorizontalSlider');
dojo.require('dijit.layout.ContentPane');

(function(d) {
	dojo.declare('PhotoBrowser.Toolbar', [ dijit.layout.ContentPane, dijit._Templated ], {
		templatePath : dojo.moduleUrl('PhotoBrowser', 'templates/toolbar.html'),

		postCreate : function() {
			this.inherited(arguments);
			// enable add and remove buttons
			this.connect(this.addSearch, 'click', '_addList');
			this.connect(this.removeSearch, 'click', '_removeList');
			
			this.slider = new dijit.form.HorizontalSlider({
				name : 'slider',
				value : 100,
				minimum : 50,
				maximum : 250,
				intermediateChanges : true,
				showButtons : false,
				style : 'width:200px',
				onChange : function(val) {
					console.log(val);
					d.publish('/photos/resize', [ val ]);
				}
			}, this.sliderControl);
			
			// this.connect(this.useStorage, 'click', '_useStorage');
		},
		
		_addList : function(e) {
			e.preventDefault();
			// prompt the user to enter a tag; then, publish the addition
			// so that another component can handle it -- remember, we're
			// just a lowly toolbar
			var term = prompt('Enter a tag to search for photos', '');
			if (!term) { return; }
			d.publish('/term/add', [ term ]);
		},
		
		_removeList : function(e) {
			e.preventDefault();
			// publish the removal so another component can handle it
			d.publish('/term/remove');
		},
		
		_useStorage : function(e) {
			d.publish('/storage', [ e.target.checked ]);
		}
	});
})(dojo);
