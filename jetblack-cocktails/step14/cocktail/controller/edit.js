angular
  .module('cocktailApp')
  .controller('CocktailEditCtrl', ['$location', '$routeParams', 'navigator', 'cocktailCollection',
    function($location, $routeParams, navigator, cocktailCollection) {

      var self = this;

      self.isDisabled = true;
      self.cocktailCollection = cocktailCollection;

      if (!$routeParams.id) {
        self.cocktail = {};
        self.isDisabled = false;
      } else {
        cocktailCollection.get($routeParams.id)
          .then(function(cocktail) {
            self.cocktail = cocktail;
            self.isDisabled = false;
          }, function(err) {
            self.errorMessage = "Failed to find id: " + id;
          });
      }

      var foo = cocktailCollection.getRelationValues('source')
        .then(function(sources) {
          console.log("ok");
        }, function(err) {
          console.log('error');
        });

      self.addEquipment = function() {
        if (!self.cocktail.equipment) {
          self.cocktail.equipment = [];
        }
        self.cocktail.equipment.push(null);
      };

      self.removeEquipment = function(index) {
        self.cocktail.equipment.splice(index, 1);
      };

      self.addIngredient = function() {
        if (!self.cocktail.ingredients) {
          self.cocktail.ingredients = [];
        }
        self.cocktail.ingredients.push(null);
      };

      self.removeIngredient = function(index) {
        self.cocktail.ingredients.splice(index, 1);
      };

      self.addStep = function() {
        if (!self.cocktail.method) {
          self.cocktail.method = [];
        }
        self.cocktail.method.push(null);
      };

      self.removeStep = function(index) {
        self.cocktail.method.splice(index, 1);
      };

      self.submit = function() {
        cocktailCollection.set(self.cocktail)
          .then(function(cocktail) {
            navigator.viewCocktail(self.cocktail.id);
          }, function(err) {
            self.errorMessage = "Failed to set";
            console.log("Failed to set");
          });
      };

      self.cancel = function() {
        navigator.viewCocktail(self.cocktail.id);
      };
    }
  ]);
