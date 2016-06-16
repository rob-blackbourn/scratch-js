angular
  .module('cocktailApp')
  .config(['$routeProvider', 'localStorageServiceProvider',
    function($routeProvider, localStorageServiceProvider) {

      localStorageServiceProvider.setPrefix('');
      localStorageServiceProvider.setStorageType('localStorage');

      $routeProvider
        .when('/cocktails/list', {
          templateUrl: 'cocktail/view/list.html',
          controller: 'CocktailListCtrl as cocktailListCtrl'
        })
        .when('/cocktails/detail/:id', {
          templateUrl: 'cocktail/view/detail.html',
          controller: 'CocktailDetailCtrl as cocktailDetailCtrl'
        })
        .when('/cocktails/edit/:id', {
          templateUrl: 'cocktail/view/edit.html',
          controller: 'CocktailEditCtrl as cocktailEditCtrl'
        })
        .when('/cocktails/add', {
          templateUrl: 'cocktail/view/edit.html',
          controller: 'CocktailEditCtrl as cocktailEditCtrl'
        })
        .when('/sources/list', {
          templateUrl: 'source/view/list.html',
          controller: 'SourceListCtrl as sourceListCtrl'
        })
        .when('/sources/detail/:id', {
          templateUrl: 'source/view/detail.html',
          controller: 'SourceDetailCtrl as sourceDetailCtrl'
        })
        .when('/sources/edit/:id', {
          templateUrl: 'source/view/edit.html',
          controller: 'SourceEditCtrl as sourceEditCtrl'
        })
        .when('/sources/add', {
          templateUrl: 'source/view/edit.html',
          controller: 'SourceEditCtrl as sourceEditCtrl'
        })
        .otherwise({
          redirectTo: '/cocktails/list'
        });
    }
  ]);
