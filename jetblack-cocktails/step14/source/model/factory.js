angular.module('cocktailApp')
  .factory('sourceCollection', ['$q', 'rfc4122', 'storageCollection', 'sourceList',
    function($q, rfc4122, storageCollection, sourceList) {
      sourceCollection = new CollectionDb($q, rfc4122, storageCollection.getCollection("sources"), []);
      sourceCollection.initialise(sourceList)
        .then(function(ok) {
          // Nothing to do here.
        }, function(err) {
          throw Error("Failed to initialise");
        });
      return sourceCollection;
    }
  ]);
