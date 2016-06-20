angular
  .module('cocktailApp')
  .controller('CocktailListCtrl', ['$location', 'navigator', 'cocktailCollection',
    function($location, navigator, cocktailCollection) {

      var self = this;

      self.isDisabled = true;

      cocktailCollection.getList()
        .then(function(cocktails) {
          self.cocktails = cocktails;
          self.isDisabled = false;
        }, function(err) {
          self.errorMessage = "Unable to get cocktails: " + err;
        });

      self.addCocktail = function() {
        navigator.addCocktail();
      };

      self.sources = function() {
        navigator.listSources();
      };

      self.reset = function() {
        cocktailCollection.clear()
        .then(function(ok) {
          navigator.listCocktails();
        }, function(err) {
          self.errorMessage = "Failed to reset";
        });
      };
    }
  ]);
