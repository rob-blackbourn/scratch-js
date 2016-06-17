angular.module('cocktailApp')
  .factory('cocktailCollection', ['$q', 'rfc4122', 'storageCollection', 'sourceCollection', 'cocktailList',
    function($q, rfc4122, storageCollection, sourceCollection, cocktailList) {
      relations = [{
        name: 'source',
        collection: sourceCollection
      }];
      cocktailCollection = new CollectionDb($q, rfc4122, storageCollection.getCollection("cocktails"), relations);
      cocktailCollection.initialise(cocktailList)
        .then(function(ok) {
          // Nothing to do here.
        }, function(err) {
          throw Error("Failed to initialise");
        });
      return cocktailCollection;
    }
  ]);
