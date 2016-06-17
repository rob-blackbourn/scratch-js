angular.module('cocktailApp')
  .factory('CocktailFactory', ['$q', 'rfc4122', 'cocktailList', 'storageCollection',
    function($q, rfc4122, cocktailList, storageCollection) {
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
