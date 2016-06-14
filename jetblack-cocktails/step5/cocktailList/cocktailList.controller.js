angular
  .module('cocktailApp')
  .controller('CocktailListCtrl', ['CocktailFactory',
    function(CocktailFactory) {
      var self = this;

      CocktailFactory.getAll()
        .then(function(cocktails) {
          self.cocktails = cocktails;
        }, function(err) {
          self.errorMessage = "Unable to get cocktails: " + err;
        });
    }
  ]);
