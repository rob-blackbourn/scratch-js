function CollectionDb($q, rfc4122, collection) {
  this.$q = $q;
  this.rfc4122 = rfc4122;
  this.collection = collection;
}

// Populate the collection with initial values
CollectionDb.prototype.initialise = function(seedData) {
  var self = this;

  return self.$q(function(resolve, reject) {
    // Find the count asynchronously.
    self.collection.count()
      .then(function(count) {
        if (count > 0) {
          resolve(self);
        } else {
          var onSuccess = function(value) {};
          var failures = [];
          var onFailure = function(err) {
            failures.push(err);
          };
          for (var i = 0; i < seedData.length; ++i) {
            var item = seedData[i];
            self.collection.add(item.id, item)
              .then(onSuccess, onFailure);
          }
          if (failures.length > 0) {
            reject(failures);
          } else {
            resolve(self);
          }
        }
      }, function(err) {
        reject(err);
      });
  });

};

CollectionDb.prototype.getList = function() {
  var self = this;

  return self.$q(function(resolve, reject) {

    self.collection.items()
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

CollectionDb.prototype.get = function(key) {
  return this.collection.get(key);
};

CollectionDb.prototype.set = function(value) {
  var self = this;

  return self.$q(function(resolve, reject) {

    if (!value.id) {
      value.id = rfc4122.v4();
    }

    self.collection.set(value.id, value)
      .then(resolve, reject);
  });
};

CollectionDb.prototype.delete = function(key) {
  return this.collection.remove(key);
};

CollectionDb.prototype.clear = function() {
  return this.collection.clear();
};
