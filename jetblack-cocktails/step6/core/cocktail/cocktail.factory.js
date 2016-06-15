angular
  .module('cocktailApp')
  .factory('CocktailFactory', ['$q', 'rfc4122', 'cocktailList', 'localStorageService',
    function($q, rfc4122, cocktailList, localStorageService) {

      self.cocktailStorage = localStorageService;

      if (!self.cocktailStorage.get("cocktailList")) {
        self.cocktailStorage.set("cocktailList", cocktailList.map(function(cocktail) {
          return {
            id: cocktail.id,
            name: cocktail.name
          };
        }));
        for (var i = 0; i < cocktailList.length; ++i) {
          self.cocktailStorage.set(cocktailList[i].id, cocktailList[i]);
        }
      }

      return {

        getList: function() {
          return $q(function(resolve, reject) {
            resolve(self.cocktailStorage.get("cocktailList"));
          });
        },

        get: function(id) {
          return $q(function(resolve, reject) {
            var cocktail = self.cocktailStorage.get(id);
            if (cocktail) {
              resolve(cocktail);
            } else {
              reject(id);
            }
          });
        },

        set: function(cocktail) {
          return $q(function(resolve, reject) {

            if (!cocktail.id) {
              cocktail.id = rfc4122.v4();
              cocktails = self.cocktailStorage.get("cocktailList");
              cocktails.push({
                id: cocktail.id,
                name: cocktail.name
              });
              self.cocktailStorage.set("cocktailList", cocktails);
            }

            self.cocktailStorage.set(cocktail.id, cocktail);

            resolve(cocktail);
          });
        },

        delete: function(id) {
          return $q(function(resolve, reject) {

            cocktails = self.cocktailStorage.get("cocktailList");
            var i = cocktails.findIndex(function(element) {
              return element.id == id;
            });
            if (i !== -1) {
              cocktails.splice(i, 1);
              self.cocktailStorage.set("cocktailList", cocktails);
            }

            self.cocktailStorage.remove(id);

            resolve(id);
          });
        }
      };
    }
  ]);
