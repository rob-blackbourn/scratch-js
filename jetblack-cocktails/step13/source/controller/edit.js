angular
  .module('cocktailApp')
  .controller('SourceEditCtrl', ['$location', '$routeParams', 'SourceFactory', 'Navigator',
    function($location, $routeParams, SourceFactory, Navigator) {

      var self = this;

      self.isDisabled = true;

      if (!$routeParams.id) {
        self.source = {};
        self.isDisabled = false;
      } else {
        SourceFactory.get($routeParams.id)
          .then(function(source) {
            self.source = source;
            self.isDisabled = false;
          }, function(err) {
            self.errorMessage = "Failed to find id: " + id;
          });
      }

      self.submit = function() {
        SourceFactory.set(self.source)
          .then(function(source) {
            Navigator.viewSource(self.source.id);
          }, function(err) {
            self.errorMessage = "Failed to set";
            console.log("Failed to set");
          });
      };

      self.cancel = function() {
        Navigator.viewSource(self.source.id);
      };
    }
  ]);
