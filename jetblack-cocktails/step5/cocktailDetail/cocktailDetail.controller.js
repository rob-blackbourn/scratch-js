angular
  .module('cocktailApp')
  .controller('CocktailDetailCtrl', ['$routeParams', 'CocktailFactory',
    function($routeParams, CocktailFactory) {
      var self = this;
      CocktailFactory.get($routeParams.id)
        .then(function(cocktail) {
          self.cocktail = cocktail;
        }, function (err) {
          self.errorMessage = "Failed to find id: " + id;
        });
    }
  ]);
