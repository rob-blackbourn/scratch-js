angular.module('cocktailApp')
  .factory('SourceFactory', ['$q', 'rfc4122', 'sourceList', 'storageCollection',
    function($q, rfc4122, sourceList, storageCollection) {
      var collection = storageCollection.getCollection("sources");
      db = new CollectionDb($q, rfc4122, sourceList, collection);
      return db;
    }
  ]);
