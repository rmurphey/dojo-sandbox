dojo.provide('Transformers.Gun');

dojo.require('Transformers._Weapon');

(function(d) {
	d.declare('Transformers.Gun', [ Transformers._Weapon ], {
		damage : 1,
		rounds : 100,
		reload : 150,
		type : 'gun'
	});
})(dojo);