dojo.provide('PhotoBrowser._base');

dojo.require('PhotoBrowser.SearchController');
dojo.require('PhotoBrowser.Toolbar');
dojo.require('PhotoBrowser.Results');

dojo.require('dijit.layout.BorderContainer');

dojo.addOnLoad(function() {
	var bc = new dijit.layout.BorderContainer({ 
		design : 'headline',
		style : 'width:100%; height:100%'
	}, dojo.byId('container'));

	var toolbar = new PhotoBrowser.Toolbar({ 
		region : 'top',
		style : 'height:50px'
	}, dojo.byId('toolbar')).placeAt(bc);
	
	var searches = new PhotoBrowser.SearchController({ 
		region : 'left', 
		style : 'width:100px;', 
		splitter : true 
	}, dojo.byId('search_terms')).placeAt(bc);

	var results = new PhotoBrowser.Results({ 
		region : 'center'
	}, dojo.byId('results')).placeAt(bc);
	
	bc.startup();
});
