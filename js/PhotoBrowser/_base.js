dojo.provide('PhotoBrowser._base');

dojo.require('PhotoBrowser.StoredSearchController');
dojo.require('PhotoBrowser.Toolbar');
dojo.require('PhotoBrowser.Results');

dojo.require('dijit.layout.BorderContainer');

dojo.addOnLoad(function() {
	var bc = new dijit.layout.BorderContainer({ 
		design : 'headline',
		style : 'width:100%; height:100%'
	}, dojo.byId('container'));

	new PhotoBrowser.Toolbar({ 
		region : 'top',
		style : 'height:50px'
	}, dojo.byId('toolbar'));
	
	new PhotoBrowser.StoredSearchController({ 
		region : 'left', 
		style : 'width:100px;', 
		splitter : true 
	}, dojo.byId('search_terms'));

	new PhotoBrowser.Results({ 
		region : 'center'
	}, dojo.byId('results'));
	
	bc.startup();
});
