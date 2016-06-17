angular.module('cocktailApp')
  .factory('sourceCollection', ['$q', 'rfc4122', 'storageCollection', 'sourceList',
    function($q, rfc4122, storageCollection, sourceList) {
      var collection = storageCollection.getCollection("sources");
      db = new CollectionDb($q, rfc4122, collection);
      db.initialise(sourceList)
        .then(function(ok) {
          // Nothing to do here.
        }, function(err) {
          throw Error("Failed to initialise");
        });
      return db;
    }
  ]);
