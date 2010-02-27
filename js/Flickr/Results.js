dojo.provide('Flickr.Results');

dojo.require('dojo.fx');
dojo.require('dojo.fx.easing');
dojo.require('dojo.string');

(function(d) {
	dojo.declare('Flickr.Results', null, {
		template : dojo.cache('Flickr', 'templates/image.html'),

		constructor : function(node) {
			this.domNode = node;
			this.containerWidth = d.position(this.domNode);
			
			this.imageSize = this._calculateImageSize();
		
			// listen for instructions 
			d.subscribe('/items/show', this, '_showItems');
			d.subscribe('/results/clear', this, '_clear');
			d.subscribe('/results/resize', this, '_resize');
		},
		
		_calculateImageSize : function() {
			return this.containerWidth > 100 ? 'm' : 't'	
		},
	
		_showItems : function(items) {
			// receive any items and show them in the results area
			this._clear();
			var anims = [];
		
			d.forEach(items, function(item) {
				console.log(item);
			
				// create an element for each item and add it to the results container
				item.imgUrl = item.media[this.imageSize];
				
				var node = d.create('div', {
						innerHTML : d.string.substitute(this.template, item)
					});
			
				d.place(node, this.domNode, 'last');
			
				// hide the item to start with; we'll fade it in momentarily
				d.style(node, { opacity : 0 });
			
				// fancy fadein effect from twitterverse by peter higgins
				// http://github.com/phiggins42/twitterverse/blob/master/src/beer/Search.js
				var anim = d.fadeIn({
					node : node,
					duration : 500,
					easing : dojo.fx.easing.quintOut,
					onEnd : function() {
						setTimeout(function() {
							anims.pop();
						}, 10);
					}
				});
			
				anims.push(1);
			
				anim.play(50 * anims.length);
			}, this);
		},
	
		_clear : function() {
			dojo.empty(this.domNode);
		},
	
		_resize : function(size) {
			// TODO
		}
	});
})(dojo);
