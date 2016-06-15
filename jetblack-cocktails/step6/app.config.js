angular
  .module('cocktailApp')
  .config(['$routeProvider', 'localStorageServiceProvider',
    function($routeProvider, localStorageServiceProvider) {

      localStorageServiceProvider.setPrefix('cocktailApp');
      localStorageServiceProvider.setStorageType('localStorage');
      
      $routeProvider
        .when('/cocktails/list', {
          templateUrl: 'cocktailList/cocktailList.html',
          controller: 'CocktailListCtrl as cocktailListCtrl'
        })
        .when('/cocktails/detail/:id', {
          templateUrl: 'cocktailDetail/cocktailDetail.html',
          controller: 'CocktailDetailCtrl as cocktailDetailCtrl'
        })
        .when('/cocktails/edit/:id', {
          templateUrl: 'cocktailEdit/cocktailEdit.html',
          controller: 'CocktailEditCtrl as cocktailEditCtrl'
        })
        .when('/cocktails/add', {
          templateUrl: 'cocktailEdit/cocktailEdit.html',
          controller: 'CocktailEditCtrl as cocktailEditCtrl'
        })
        .otherwise({
          redirectTo: '/cocktails/list'
        });
    }
  ]);
