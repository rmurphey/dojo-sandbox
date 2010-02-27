dependencies = {
	stripConsole : "all",
	action : 'release',
	optimize : 'shrinksafe',
	releaseName : 'flickr',
	
	layers: [
		{
			name: "../Flickr/_base.js",
			dependencies: [
				"Flickr._base"
			]
		},
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "Flickr", "../Flickr" ]
	]
}
