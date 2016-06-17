angular
  .module('cocktailApp')
  .controller('CocktailListCtrl', ['$location', 'CocktailFactory', 'Navigator',
    function($location, CocktailFactory, Navigator) {

      var self = this;

      self.isDisabled = true;

      CocktailFactory.getList()
        .then(function(cocktails) {
          self.cocktails = cocktails;
          self.isDisabled = false;
        }, function(err) {
          self.errorMessage = "Unable to get cocktails: " + err;
        });

      self.addCocktail = function() {
        Navigator.addCocktail();
      };

      self.sources = function() {
        Navigator.listSources();
      };

      self.reset = function() {
        CocktailFactory.clear()
        .then(function(ok) {
          Navigator.listCocktails();
        }, function(err) {
          self.errorMessage = "Failed to reset";
        });
      };
    }
  ]);
