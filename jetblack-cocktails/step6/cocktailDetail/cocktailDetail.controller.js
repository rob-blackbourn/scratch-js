angular
  .module('cocktailApp')
  .controller('CocktailDetailCtrl', ['$location', '$routeParams', 'CocktailFactory',
    function($location, $routeParams, CocktailFactory) {

      var self = this;

      self.isDisabled = true;

      CocktailFactory.get($routeParams.id)
        .then(function(cocktail) {
          self.cocktail = cocktail;
          self.isDisabled = false;
        }, function (err) {
          self.errorMessage = "Failed to find id: " + id;
        });

        self.edit = function() {
          // Need to disable the button until the data has arrived.
          $location.path('/cocktails/edit/' + self.cocktail.id);
        };
    }
  ]);
