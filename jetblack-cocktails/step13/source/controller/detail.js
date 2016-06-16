angular.module('cocktailApp')
  .controller('SourceDetailCtrl', ['$location', '$routeParams', 'SourceFactory', 'Navigator',
    function($location, $routeParams, SourceFactory, Navigator) {

      var self = this;

      self.isDisabled = true;

      SourceFactory.get($routeParams.id)
        .then(function(source) {
          self.source = source;
          self.isDisabled = false;
        }, function (err) {
          self.errorMessage = "Failed to find id: " + id;
        });

        self.delete = function() {
          SourceFactory.delete(self.source.id)
          .then(function(ok) {
            Navigator.listSources();
          }, function (err) {
            self.errorMessage = "Failed to delete id: " + id;
          });
        };

        self.edit = function() {
          Navigator.editSource(self.source.id);
        };

        self.back = function() {
          Navigator.listSources();
        };
    }
  ]);
