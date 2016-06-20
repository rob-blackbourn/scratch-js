angular.module('cocktailApp')
  .factory('storageCollection', ['$q', 'localStorageService',
    function($q, localStorageService) {
      return {
        getCollection: function(name) {

          var prefix = name + '/';

          var realKeys = function() {
            var real_keys = localStorageService.keys().filter(function(element) {
              return element.startsWith(prefix);
            });
            return real_keys;
          };

          return {

            add: function(key, value) {

              return $q(function(resolve, reject) {
                if (!key) {
                  reject("key is unll or undefined");
                } else {
                  var realKey = prefix + key;

                  if (localStorageService.get(realKey)) {
                    reject("key exists");
                  } else {
                    resolve(localStorageService.set(realKey, value));
                  }
                }
              });
            },

            get: function(key) {
              return $q(function(resolve, reject) {
                if (!key) {
                  reject("key is unll or undefined");
                } else {
                  resolve(localStorageService.get(prefix + key));
                }
              });
            },

            set: function(key, value) {
              return $q(function(resolve, reject) {
                if (!key) {
                  reject("key is unll or undefined");
                } else {
                  resolve(localStorageService.set(prefix + key, value));
                }
              });
            },

            remove: function(key) {
              return $q(function(resolve, reject) {
                if (!key) {
                  reject("key is unll or undefined");
                } else {
                  resolve(localStorageService.remove(prefix + key));
                }
              });
            },

            clear: function() {
              return $q(function(resolve, reject) {
                real_keys = realKeys();
                for (var i = 0; i < real_keys.length; ++i) {
                  localStorageService.remove(real_keys[i]);
                }
                resolve(real_keys.length);
              });
            },

            count: function() {
              return $q(function(resolve, reject) {
                resolve(realKeys().length);
              });
            },

            keys: function() {
              return $q(function(resolve, reject) {
                resolve(realKeys().map(function(realKey) {
                  return qualified_key.slice(prefix.length);
                }));
              });
            },

            values: function() {
              return $q(function(resolve, reject) {
                resolve(realKeys().map(function(realKey) {
                  return localStorageService.get(realKey);
                }));
              });
            },

            items: function() {
              return $q(function(resolve, reject) {
                resolve(realKeys().map(function(real_key) {
                  return {
                    key: real_key.slice(prefix.length),
                    value: localStorageService.get(real_key)
                  };
                }));
              });
            },

            containsKey: function(key) {
              return $q(function(resolve, reject) {
                resolve(
                  keys().find(function(element) {
                    return element === key;
                  }) !== null);
              });
            }
          };
        }
      };
    }
  ]);
