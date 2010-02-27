dojo.provide('Flickr._base');

dojo.require('Flickr.StoredSearchController');
dojo.require('Flickr.Toolbar');
dojo.require('Flickr.Results');

new Flickr.Toolbar({}, dojo.byId('header'));

// new Flickr.StoredSearchController({}, dojo.byId('sidebar'));
// new Flickr.Results(dojo.byId('content'));

new Flickr.StoredSearchController({}, dojo.byId('content'));
new Flickr.Results(dojo.byId('sidebar'));