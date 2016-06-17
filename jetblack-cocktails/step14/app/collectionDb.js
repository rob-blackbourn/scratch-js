function CollectionDb($q, rfc4122, collection, relations) {
  this.$q = $q;
  this.rfc4122 = rfc4122;
  this.collection = collection;
  this.relations = relations || [];
}

CollectionDb.prototype.clone = function(value) {
  return JSON.parse(JSON.stringify(value));
};

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

CollectionDb.prototype.getAll = function() {
  return this.collection.values();
};

CollectionDb.prototype.get = function(key) {
  var self = this;

  function resolveRelation(item, relation) {
    relation.collection.get(item[relation.name])
      .then(function(relationValue) {
        item[relation.name] = relationValue;
      }, function(err) {
        item[relation.name] = null;
      });
  }

  return self.$q(function(resolve, reject) {
    self.collection.get(key)
      .then(function(value) {
        if (value) {
          self.relations.forEach(function (relation) {
            resolveRelation(value, relation);
          });
      }
      resolve(value);
    }, function (err) {
      reject(err);
    });
  });
};

CollectionDb.prototype.set = function(value) {
  var self = this;

  value = self.clone(value);

  return self.$q(function(resolve, reject) {

    if (!value.id) {
      value.id = rfc4122.v4();
    }

    self.relations.foreach(function(relation) {
      if (value[relation.name]) {
        value[relation.name] = value[relation.name].id;
      }
    });

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

CollectionDb.prototype.getRelationValues = function(name) {
  var self = this;

  return self.$q(function(resolve, reject) {
    var relation = self.relations.find(function(element) {
      return element.name === name;
    });
    if (!relation) {
      reject(name);
    } else {
      relation.collection.getAll()
        .then(function(values) {
          resolve(values);
        }, function(err) {
          reject(err);
        });
    }
  });
};
