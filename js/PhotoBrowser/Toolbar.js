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
			this.connect(this.addSearch, 'keypress', '_addTerm');
			
			this.slider = new dijit.form.HorizontalSlider({
				name : 'slider',
				value : 250,
				minimum : 50,
				maximum : 250,
				showButtons : false,
				style : 'width:200px',
				onChange : function(val) {
					d.publish('/photos/resize', [ val ]);
				}
			}, this.sliderControl);
			// this.connect(this.useStorage, 'click', '_useStorage');
		},
		
		_addTerm : function(e) {
			if (e.keyCode != d.keys.ENTER) { return; }
			e.preventDefault();

			var term = d.trim(this.addSearch.value);
			if (!term) { return; }
			
			d.publish('/term/add', [ term ]);
			this.addSearch.value = '';
		},
		
		_useStorage : function(e) {
			d.publish('/storage', [ e.target.checked ]);
		}
	});
})(dojo);
