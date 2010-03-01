dojo.provide('PhotoBrowser._base');

dojo.require('PhotoBrowser.StoredSearchController');
dojo.require('PhotoBrowser.Toolbar');
dojo.require('PhotoBrowser.Results');

new PhotoBrowser.Toolbar({}, dojo.byId('toolbar'));

// new PhotoBrowser.StoredSearchController({}, dojo.byId('sidebar'));
// new PhotoBrowser.Results(dojo.byId('content'));

new PhotoBrowser.StoredSearchController({}, dojo.byId('search_terms'));
new PhotoBrowser.Results(dojo.byId('results'));