angular
  .module('cocktailApp')
  .controller('CocktailListCtrl', ['CocktailFactory',
    function(CocktailFactory) {
      var self = this;
      self.getAll = CocktailFactory.getAll;
    }
  ]);
