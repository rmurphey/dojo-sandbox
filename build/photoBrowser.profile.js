dependencies = {
	stripConsole : "all",
	action : 'release',
	optimize : 'shrinksafe',
	releaseName : 'photoBrowser',
	
	layers: [
		{
			name: "../PhotoBrowser/_base.js",
			dependencies: [
				"PhotoBrowser._base"
			]
		},
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "PhotoBrowser", "../PhotoBrowser" ]
	]
}
