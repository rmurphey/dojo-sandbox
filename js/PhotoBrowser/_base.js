dojo.provide('PhotoBrowser._base');

dojo.require('PhotoBrowser.StoredSearchController');
dojo.require('PhotoBrowser.Toolbar');
dojo.require('PhotoBrowser.Results');

dojo.require('dijit.layout.BorderContainer');

dojo.addOnLoad(function() {
	new PhotoBrowser.Toolbar({ 
		region : 'top',
		style : 'height:50px'
	}, dojo.byId('toolbar'));
	console.log('toolbar set up');
	
	new PhotoBrowser.StoredSearchController({ 
		region : 'left', 
		style : 'width:100px;', 
		splitter : true 
	}, dojo.byId('search_terms'));
	console.log('search_terms set up');

	new PhotoBrowser.Results({ 
		region : 'center'
	}, dojo.byId('results'));
	console.log('results set up');
	
	var bc = new dijit.layout.BorderContainer({ 
		design : 'headline',
		style : 'width:100%; height:100%'
	}, dojo.byId('container'));
	console.log('container set up');
	
	bc.startup();
});
