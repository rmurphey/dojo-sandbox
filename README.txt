= GETTING DOJO =

This repo includes Dojo via git submodules. To load them, first, fork the repo.
Then, From inside the repository, run 

	git submodule update --init

Alternately, you can get Dojo as a tarball

	cd util
	./getDojoTarball.sh
	
This will download the 23mb source tarball, unzip it, and put the files 
in the right place. Probably.


= USE THIS REPO AS A DOJO SKELETON APP =

* fork the repo
* from the root of the repo, run 

	./util/getSkeleton.sh

	
* you now have a skeleton app with dojo trunk included



= BUILDING RELEASES =

* first, look in build/ to see if there's a profile for the app
* if there is, from the root of the repo, do:

	cd util
	./build.sh <profileName>
	
* a profile name is not the full filename; it's just "flickr", e.g.