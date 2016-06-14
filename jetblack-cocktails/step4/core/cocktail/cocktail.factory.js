angular
  .module('cocktailApp')
  .factory('CocktailFactory', ['cocktailList',
    function(cocktailList) {
      return {
        getAll: function() {
          return cocktailList;
        },
        getSummary: function() {
          return cocktailList.map(function(cocktail) {
            return {id: cocktail.id, name: cocktail.name};
          });
        },
        get: function(id) {
          return cocktailList.find(function(cocktail) {
            return cocktail.id === id;
          });
        }
      };
    }
  ]);
