'use strict';

/* Filters */

angular.module('phonecatFilters', []).filter('pagination', function() {
  return function(inputArray,selectedPage,pageSize) {
    var start = selectedPage*pageSize;
    return inputArray.slice(start,start+pageSize);
  };
});
