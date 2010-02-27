curl http://download.dojotoolkit.org/release-1.4.1/dojo-release-1.4.1.tar.gz > dojo-release-1.4.1.tar.gz
tar -xzvf dojo-release-1.4.1.tar.gz 

cp -r dojo-release-1.4.1/dojo ../js/dojo
cp -r dojo-release-1.4.1/dojox ../js/dojox
cp -r dojo-release-1.4.1/dijit ../js/dijit
cp -r dojo-release-1.4.1/util ../js/util

rm -rf dojo-release-1.4.1.tar.gz dojo-release-1.4.1
