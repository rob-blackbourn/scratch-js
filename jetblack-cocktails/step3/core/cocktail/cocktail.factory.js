angular
  .module('cocktailApp')
  .factory('cocktailFactory', ['cocktailList',
    function(cocktailList) {
      return {
        getAll: function() {
          return cocktailList;
        }
      };
    }
  ]);
