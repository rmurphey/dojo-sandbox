dojo.provide('Random.Services');

dojo.require('dojox.rpc.Service');

dojo.declare('Random.Services', null, {
	
	_envelopes : [
		dojox.rpc.envelopeRegistry.register(
			/**
			 * allows for postData to get sent separately,
			 * without using the URL
			 */
			"services_POSTDATA",
		
			function(str) {
				return str == 'services_POSTDATA';
			},
		
			{
				serialize : function(smd, method, data) {
					var target = dojox.rpc.getTarget(smd, method);
				
					for (k in data) {
						if (k !== 'postData') {
							target += '/' + k + '/' + data[k];
						}
					}
				
					return {
						data : data.postData,
						target : target + '/',
						handleAs : 'json'
					};
				},
			
				deserialize : function(results) {
					return results;
				},
			
				namedParams : true
			}
		),

		dojox.rpc.envelopeRegistry.register(
			/* adds a trailing slash to request URLs */
			"services_PATH_TRAILING_SLASH",
			function(str){ return str == "services_PATH_TRAILING_SLASH"; },
			{
				serialize:function(smd, method, data){
					var i;
					var target = dojox.rpc.getTarget(smd, method);
					if(dojo.isArray(data)){
						for(i = 0; i < data.length;i++){
							target += '/' + data[i];
						}
					}else{
						for(i in data){
							target += '/' + i + '/' + data[i];
						}
					}

					return {
						data:'',
						target: target + '/'
					};
				},
				deserialize:function(results){
					return results;
				}
			}
		)
	],
	
	_transports : [
		dojox.rpc.transportRegistry.register(
			"services_POST_WITH_PARAMS",
			function(str) { 
				return str == "services_POST_WITH_PARAMS"; 
			},
			{
				fire: function(r) {
					r.url = r.target;
					r.postData = r.data;
					r.preventCache = true;
					return dojo.xhrPost(r);
				}
			}
		),
		
		dojox.rpc.transportRegistry.register(
			"services_POST",
			function (str) {
				return str == 'services_POST';
			},
			{
				fire : function(r) {
					r.url = r.target;
					r.postData = r.data;
					r.preventCache = true;
					return dojo.xhrPost(r);
				}
			}
		),
		
		dojox.rpc.transportRegistry.register(
			"services_GET",
			function (str) {
				return str == 'services_GET';
			},
			{
				fire : function(r) {
					r.url = r.target;
					r.preventCache = true;
					return dojo.xhrGet(r);
				}
			}
		),
		
		dojox.rpc.transportRegistry.register(
			"services_SYNC",
			function (str) {
				return str == 'services_SYNC';
			},
			{
				fire : function(r) {
					r.url = r.target;
					r.preventCache = false;
					r.sync = true;
					return dojo.xhrGet(r);
				}
			}
		)
		
	],
	
	json : new dojox.rpc.Service(dojo.moduleUrl('smd', 'json.txt')),
	html : new dojox.rpc.Service(dojo.moduleUrl('smd', 'html.txt'))
});

Random.Services = new Random.Services();