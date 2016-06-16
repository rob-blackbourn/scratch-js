angular
  .module('cocktailApp')
  .config(['$routeProvider', 'localStorageServiceProvider',
    function($routeProvider, localStorageServiceProvider) {

      localStorageServiceProvider.setPrefix('');
      localStorageServiceProvider.setStorageType('localStorage');

      $routeProvider
        .when('/cocktails/list', {
          templateUrl: 'cocktail/view/cocktailList.html',
          controller: 'CocktailListCtrl as cocktailListCtrl'
        })
        .when('/cocktails/detail/:id', {
          templateUrl: 'cocktail/view/cocktailDetail.html',
          controller: 'CocktailDetailCtrl as cocktailDetailCtrl'
        })
        .when('/cocktails/edit/:id', {
          templateUrl: 'cocktail/view/cocktailEdit.html',
          controller: 'CocktailEditCtrl as cocktailEditCtrl'
        })
        .when('/cocktails/add', {
          templateUrl: 'cocktail/view/cocktailEdit.html',
          controller: 'CocktailEditCtrl as cocktailEditCtrl'
        })
        .otherwise({
          redirectTo: '/cocktails/list'
        });
    }
  ]);
