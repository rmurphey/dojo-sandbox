dojo.provide('Flickr._base');

dojo.require('Flickr.SearchController');
dojo.require('Flickr.Toolbar');
dojo.require('Flickr.Results');

new Flickr.Toolbar({}, dojo.byId('header'));
new Flickr.SearchController({}, dojo.byId('sidebar'));
new Flickr.Results(dojo.byId('content'));

/*
dojo.connect(dojo, 'publish', this, function() {
	console.log(arguments);
});
*/
