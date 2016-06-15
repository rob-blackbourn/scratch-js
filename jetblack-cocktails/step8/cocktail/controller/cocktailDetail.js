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

        self.delete = function() {
          CocktailFactory.delete(self.cocktail.id)
          .then(function(ok) {
            $location.path('/cocktails/list' + self.cocktail.id);
          }, function (err) {
            self.errorMessage = "Failed to delete id: " + id;
          });
        };

        self.edit = function() {
          $location.path('/cocktails/edit/' + self.cocktail.id);
        };

        self.back = function() {
          $location.path('/cocktails/list');
        };
    }
  ]);
