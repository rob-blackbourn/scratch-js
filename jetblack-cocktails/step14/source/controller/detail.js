angular.module('cocktailApp')
  .controller('SourceDetailCtrl', ['$location', '$routeParams', 'navigator', 'sourceCollection',
    function($location, $routeParams, navigator, sourceCollection) {

      var self = this;

      self.isDisabled = true;

      sourceCollection.get($routeParams.id)
        .then(function(source) {
          self.source = source;
          self.isDisabled = false;
        }, function (err) {
          self.errorMessage = "Failed to find id: " + id;
        });

        self.delete = function() {
          sourceCollection.delete(self.source.id)
          .then(function(ok) {
            navigator.listSources();
          }, function (err) {
            self.errorMessage = "Failed to delete id: " + id;
          });
        };

        self.edit = function() {
          navigator.editSource(self.source.id);
        };

        self.back = function() {
          navigator.listSources();
        };
    }
  ]);
