angular.module('cocktailApp')
  .factory('CocktailFactory', ['$q', 'rfc4122', 'cocktailList', 'storageCollection',
    function($q, rfc4122, cocktailList, storageCollection) {
      var collection = storageCollection.getCollection("cocktails");
      db = new CollectionDb($q, rfc4122, cocktailList, collection);
      return db;
    }
  ]);
