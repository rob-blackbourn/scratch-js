angular
  .module('cocktailApp')
  .controller('CocktailListCtrl', ['$location', 'CocktailFactory',
    function($location, CocktailFactory) {

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
        $location.path('/cocktails/add');
      };

      self.reset = function() {
        CocktailFactory.reset()
        .then(function(ok) {
          $location.path('/cocktails/list');
        }, function(err) {
          self.errorMessage = "Failed to reset";
        });
      };
    }
  ]);
