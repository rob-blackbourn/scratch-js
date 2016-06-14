angular
  .module('cocktailApp')
  .factory('CocktailFactory', ['$q', 'cocktailList',
    function($q, cocktailList) {
      return {
        getAll: function() {
          return $q(function(resolve,reject) {
            resolve(cocktailList.map(function(cocktail) {
              return {id: cocktail.id, name: cocktail.name};
            }));
          });
        },
        getSummary: function() {
          return $q(function(resolve,reject) {
            resolve(cocktailList.map(function(cocktail) {
              return {id: cocktail.id, name: cocktail.name};
            }));
          });
        },
        get: function(id) {
          return $q(function(resolve, reject) {
            var cocktail = cocktailList.find(function(cocktail) {
              return cocktail.id === id;
            });
            if (cocktail) {
              resolve(cocktail);
            } else {
              reject(id);
            }
          });
        }
      };
    }
  ]);
