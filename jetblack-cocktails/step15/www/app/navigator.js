angular.module('cocktailApp')
  .factory('navigator', ['$location',
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
        },

        listSources: function() {
          $location.path('/sources/list');
        },
        viewSource: function(id) {
          $location.path('/sources/detail/' + id);
        },
        editSource: function(id) {
          $location.path('/sources/edit/' + id);
        },
        addSource: function() {
          $location.path('/sources/add');
        }
      };
    }
  ]);
