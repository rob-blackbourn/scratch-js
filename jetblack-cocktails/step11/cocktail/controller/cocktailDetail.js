angular
  .module('cocktailApp')
  .controller('CocktailDetailCtrl', ['$location', '$routeParams', 'CocktailFactory', 'Navigator',
    function($location, $routeParams, CocktailFactory, Navigator) {

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
            Navigator.listCocktails();
          }, function (err) {
            self.errorMessage = "Failed to delete id: " + id;
          });
        };

        self.edit = function() {
          Navigator.editCocktail(self.cocktail.id);
        };

        self.back = function() {
          Navigator.listCocktails();
        };
    }
  ]);
