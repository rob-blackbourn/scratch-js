angular
  .module('cocktailApp')
  .controller('SourceListCtrl', ['$location', 'SourceFactory', 'Navigator',
    function($location, SourceFactory, Navigator) {

      var self = this;

      self.isDisabled = true;

      SourceFactory.getList()
        .then(function(sources) {
          self.sources = sources;
          self.isDisabled = false;
        }, function(err) {
          self.errorMessage = "Unable to get sources: " + err;
        });

      self.add = function() {
        Navigator.addSource();
      };

      self.reset = function() {
        SourceFactory.reset()
        .then(function(ok) {
          Navigator.listSources();
        }, function(err) {
          self.errorMessage = "Failed to reset";
        });
      };
    }
  ]);
