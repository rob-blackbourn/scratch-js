angular.module('cocktailApp')
  .factory('Navigator', ['$location',
    function($location) {
      return {
        listCocktails: function() {
          $location.path('/cocktails/list');
        },
        viewCocktail: function(id) {
          $location.path('/cocktails/detail/' + id);
        },
        editCocktail: function(id) {
          $location.path('/cocktails/edit/' + id);
        },
        addCocktail: function() {
          $location.path('/cocktails/add');
        }
      };
    }
  ]);
