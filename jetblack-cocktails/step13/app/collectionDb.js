function CollectionDb($q, rfc4122, seedData, collection) {

  // Initialise the collection if empty.
  collection.count()
    .then(function(count) {
      if (count === 0) {
        var onSuccess = function(value) {};
        var onFailure = function(value) {
          throw Error("Failed to add item");
        };
        for (var i = 0; i < seedData.length; ++i) {
          var item = seedData[i];
          collection.add(item.id, item)
            .then(onSuccess, onFailure);
        }
      }
    }, function(err) {
      throw Error("Failed to get count");
    });

  this.getList = function() {
    return $q(function(resolve, reject) {

      collection.items()
        .then(function(items) {
          resolve(items.map(function(item) {
            return {
              id: item.key,
              name: item.value.name
            };
          }));
        }, function(err) {
          reject(err);
        });
    });
  };

  this.get = collection.get;

  this.set = function(value) {
    return $q(function(resolve, reject) {

      if (!value.id) {
        value.id = rfc4122.v4();
      }

      collection.set(value.id, value)
        .then(resolve, reject);
    });
  };

  this.delete = collection.remove;

  this.reset = collection.clear;
}
