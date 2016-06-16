angular.module('cocktailApp')
  .factory('CocktailFactory', ['$q', 'rfc4122', 'cocktailList', 'storageCollection',
    function($q, rfc4122, cocktailList, storageCollection) {

      self.cocktailStorage = storageCollection.getCollection("cocktails");

      self.cocktailStorage.count().
        then(function(count) {
          if (count === 0) {
            var successes = [], failures = [];
            var onSuccess = function(value) {
              successes.push(value);
            };
            var onFailure = function(value) {
              failures.push(value);
            };
            for (var i = 0; i < cocktailList.length; ++i) {
              var cocktail = cocktailList[i];
              self.cocktailStorage.add(cocktail.id, cocktail)
                .then(onSuccess, onFailure);
            }
          }
        }, function(err) {
          console.log(err);
        });

      return {

        getList: function() {
          return $q(function(resolve, reject) {

            self.cocktailStorage.items()
              .then(function(cocktails) {
                resolve(cocktails.map(function (item) {
                  return {id: item.key, name: item.value.name};
                }));
              }, function (err) {
                self.errorMessage = "Failed to key cocktails";
              });
          });
        },

        get: self.cocktailStorage.get,

        set: function(cocktail) {
          return $q(function(resolve, reject) {

            if (!cocktail.id) {
              cocktail.id = rfc4122.v4();
            }

            self.cocktailStorage.set(cocktail.id, cocktail)
              .then(resolve, reject);
          });
        },

        delete: self.cocktailStorage.remove,

        reset:self.cocktailStorage.clear
      };
    }
  ]);
