angular
  .module('cocktailApp')
  .controller('CocktailEditCtrl', ['$location', '$routeParams', 'CocktailFactory',
    function($location, $routeParams, CocktailFactory) {

      var self = this;

      self.isDisabled = true;

      if (!$routeParams.id) {
        self.cocktail = {};
        self.isDisabled = false;
      } else {
        CocktailFactory.get($routeParams.id)
          .then(function(cocktail) {
            self.cocktail = cocktail;
            self.isDisabled = false;
          }, function(err) {
            self.errorMessage = "Failed to find id: " + id;
          });
      }

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
        CocktailFactory.set(self.cocktail)
          .then(function(cocktail) {
            $location.path('/cocktails/detail/' + self.cocktail.id);
          }, function(err) {
            self.errorMessage = "Failed to set";
            console.log("Failed to set");
          });
      };

      self.cancel = function() {
        $location.path('/cocktails/detail/' + self.cocktail.id);
      };
    }
  ]);
