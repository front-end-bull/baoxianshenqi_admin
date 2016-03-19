'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.

      //预约
      when('/yuYue', {
        templateUrl: 'partials/yuYue.html',
        controller: 'yuYueCtrl'
      }).

      //预创建
      when('/yuChuangJian', {
        templateUrl: 'partials/yuChuangJian.html',
        controller: 'yuChuangJianCtrl'
      }).

      //跟进中
      when('/genJinZhong', {
        templateUrl: 'partials/genJinZhong.html',
        controller: 'genJinZhongCtrl'
      }).

      //新增订单 
      when('/xinZengDingDan', {
        templateUrl: 'partials/xinZengDingDan.html',
        controller: 'xinZengDingDanCtrl'
      }).

      //编辑订单 
      when('/bianJiDingDan/:order_id', {
        templateUrl: 'partials/bianJiDingDan.html',
        controller: 'bianJiDingDanCtrl'
      }).

      //代理人查询
      when('/daiLiRenChaXun', {
        templateUrl: 'partials/daiLiRenChaXun.html',
        controller: 'daiLiRenChaXunCtrl'
      }).

      //推荐联系人查询
      when('/tuiJianLianXiRenChaXun', {
        templateUrl: 'partials/tuiJianLianXiRenChaXun.html',
        controller: 'tuiJianLianXiRenChaXunCtrl'
      }).

      when('/homePage', {
        templateUrl: 'partials/homePage.html',
        controller: 'homePageCtrl'
      }).
      
      otherwise({
        redirectTo: '/homePage'
      });
  }]);
