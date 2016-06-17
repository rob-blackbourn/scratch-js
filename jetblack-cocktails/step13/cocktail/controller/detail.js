angular
  .module('cocktailApp')
  .controller('CocktailDetailCtrl', ['$location', '$routeParams', 'navigator', 'cocktailCollection', 'sourceCollection',
    function($location, $routeParams, navigator, cocktailCollection, sourceCollection) {

      var self = this;

      self.isDisabled = true;

      cocktailCollection.get($routeParams.id)
        .then(function(cocktail) {
          self.cocktail = cocktail;
          return sourceCollection.get(cocktail.source);
        })
        .then(function(source) {
          self.cocktail.source = {id: source.id, name: source.name};
          self.isDisabled = false;
        }, function (err) {
          self.errorMessage = "Failed to find id: " + id;
        });

      cocktailCollection.get($routeParams.id)
        .then(function(cocktail) {
          self.cocktail = cocktail;
          self.isDisabled = false;
        }, function (err) {
          self.errorMessage = "Failed to find id: " + id;
        });

        self.delete = function() {
          cocktailCollection.delete(self.cocktail.id)
          .then(function(ok) {
            navigator.listCocktails();
          }, function (err) {
            self.errorMessage = "Failed to delete id: " + id;
          });
        };

        self.edit = function() {
          navigator.editCocktail(self.cocktail.id);
        };

        self.back = function() {
          navigator.listCocktails();
        };
    }
  ]);
