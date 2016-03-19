'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

// phonecatServices.factory('Phone', ['$resource',
//   function($resource){
//     return $resource('phones/:phoneId.json', {}, {
//       query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
//     });
//   }]);


phonecatServices.factory('BusinessService', ['$http', function ($http) {
    var list = function (page, size) {
    	var startNum = (page-1)*size;
    	var endNum = size;

        return $http.post('http://192.168.0.250:3000/query_products',{offset:startNum,num:endNum});
    };
 
    return {
        list: function (page, size) {
            return list(page, size);
        }
    };
}]);

	
