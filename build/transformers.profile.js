dependencies = {
	stripConsole : true,
	action : 'release',
	optimize : 'shrinksafe',
	releaseName : 'transformers',
	
	layers: [
		{
			name: "../Transformers/_base.js",
			dependencies: [
				"Transformers._base"
			]
		},
	],

	prefixes: [
		[ "dijit", "../dijit" ],
		[ "dojox", "../dojox" ],
		[ "Transformers", "../Transformers" ]
	]
}
