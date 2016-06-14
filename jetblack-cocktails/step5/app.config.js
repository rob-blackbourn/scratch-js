angular
  .module('cocktailApp')
  .config(['$routeProvider',
    function($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'cocktailList/cocktailList.html',
          controller: 'CocktailListCtrl as cocktailListCtrl'
        })
        .when('/cocktail/:id', {
          templateUrl: 'cocktailDetail/cocktailDetail.html',
          controller: 'CocktailDetailCtrl as cocktailDetailCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }
  ]);
