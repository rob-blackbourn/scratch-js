angular
  .module('cocktailApp')
  .controller('SourceListCtrl', ['$location', 'navigator', 'sourceCollection',
    function($location, navigator, sourceCollection) {

      var self = this;

      self.isDisabled = true;

      sourceCollection.getList()
        .then(function(sources) {
          self.sources = sources;
          self.isDisabled = false;
        }, function(err) {
          self.errorMessage = "Unable to get sources: " + err;
        });

      self.add = function() {
        navigator.addSource();
      };

      self.clear = function() {
        sourceCollection.reset()
        .then(function(ok) {
          navigator.listSources();
        }, function(err) {
          self.errorMessage = "Failed to reset";
        });
      };
    }
  ]);
