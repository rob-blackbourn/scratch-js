angular
  .module('cocktailApp')
  .controller('SourceEditCtrl', ['$location', '$routeParams', 'navigator', 'sourceCollection',
    function($location, $routeParams, navigator, sourceCollection) {

      var self = this;

      self.isDisabled = true;

      if (!$routeParams.id) {
        self.source = {};
        self.isDisabled = false;
      } else {
        sourceCollection.get($routeParams.id)
          .then(function(source) {
            self.source = source;
            self.isDisabled = false;
          }, function(err) {
            self.errorMessage = "Failed to find id: " + id;
          });
      }

      self.submit = function() {
        sourceCollection.set(self.source)
          .then(function(source) {
            navigator.viewSource(self.source.id);
          }, function(err) {
            self.errorMessage = "Failed to set";
            console.log("Failed to set");
          });
      };

      self.cancel = function() {
        navigator.viewSource(self.source.id);
      };
    }
  ]);
