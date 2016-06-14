angular
  .module('cocktailApp')
  .controller('cocktailCtrl', ['cocktailFactory',
    function(cocktailFactory) {
      this.getAll = cocktailFactory.getAll;
    }
  ]);
