angular.module('cocktailApp')
  .factory('cocktailCollection', ['$q', 'rfc4122', 'storageCollection', 'cocktailList',
    function($q, rfc4122, storageCollection, cocktailList) {
      var collection = storageCollection.getCollection("cocktails");
      db = new CollectionDb($q, rfc4122, collection);
      db.initialise(cocktailList)
        .then(function(ok) {
          // Nothing to do here.
        }, function(err) {
          throw Error("Failed to initialise");
        });
      return db;
    }
  ]);
