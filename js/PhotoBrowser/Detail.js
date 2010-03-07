dojo.provide('PhotoBrowser.Detail');

dojo.require('dojo.string');
dojo.require('dojox.image.Lightbox');

(function(d) {
	d.declare('PhotoBrowser.Detail', [ dojox.image.Lightbox ], {
		constructor : function(args) {
			this.href = args.item.media.l;
			this.group = 'results';
			this.title = d.string.substitute("${title} by ${ownername}", args.item);
		}
	});
})(dojo);