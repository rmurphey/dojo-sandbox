dojo.provide('PhotoBrowser.Results');

dojo.require('dojo.fx');
dojo.require('dojo.fx.easing');
dojo.require('dojo.string');
dojo.require('dojo.NodeList-fx');
dojo.require('dijit.layout.ContentPane');

dojo.require('PhotoBrowser.Detail');

(function(d) {
	dojo.declare('PhotoBrowser.Results', [ dijit.layout.ContentPane ], {
		template : dojo.cache('PhotoBrowser', 'templates/image.html'),
		
		constructor : function(node, args) {
			this.imageSize = (args && args.imageSize) || 250;
			this.lightboxes = [];
			
			// listen for instructions 
			d.subscribe('/items/show', this, '_showItems');
			d.subscribe('/results/clear', this, '_clear');
			d.subscribe('/photos/resize', this, '_resize');
		},
		
		postCreate:function(){
		    this.inherited(arguments);
		},
		
		_resize : function(size) {
			this.imageSize = size;
			this.images && this.images.attr('width', this.imageSize);
			d.query('> li', this.domNode).style({
				width : this.imageSize + 'px',
				height: this.imageSize + 'px'
			});
		},
		
		_showItems : function(items) {
			// receive any items and show them in the results area
			this._clear();
			var anims = [];
		
			d.forEach(items, function(item) {
				// create an element for each item and add it to the results container
				item.imgUrl = item.media['m'];
				item.photoPage = d.string.substitute('http://www.flickr.com/photos/${owner}/${id}/', item);
				
				var node = d.place(
					"<li>" + d.string.substitute(this.template, item) + "</li>",
					this.containerNode,
					'last'
				);
				
				d.style(node, {
					opacity : 0,
					width : this.imageSize + 'px',
					height: this.imageSize + 'px'
				});

				// fancy fadein effect from twitterverse by peter higgins
				// http://github.com/phiggins42/twitterverse/blob/master/src/beer/Search.js
				var anim = d.fadeIn({
					node : node,
					duration : 500,
					easing : dojo.fx.easing.quintOut,
					onEnd : function() {
						setTimeout(d.hitch(this, function() {
							anims.pop();
						}), 10);
					}
				});
			
				anims.push(1);
			
				anim.play(50 * anims.length);
				
				new PhotoBrowser.Detail({ item : item }, node).startup();
			}, this);
			
			this.images = d.query('img', this.containerNode).attr('width', this.imageSize);
		},
	
		_clear : function() {
			d.empty(this.domNode);
		}
	});
})(dojo);
