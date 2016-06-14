angular
  .module('cocktailApp')
  .controller('CocktailDetailCtrl', ['$routeParams', 'CocktailFactory',
    function($routeParams, CocktailFactory) {
      this.cocktail = CocktailFactory.get($routeParams.id);
    }
  ]);
