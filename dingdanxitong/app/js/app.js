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

      when('/forumList',{
        templateUrl:'partials/forumList.html',
        controller:'forumListCtrl'
      }).

      when('/breakRuleList',{
        templateUrl:'partials/breakRuleList.html',
        controller:'breakRuleListCtrl'
      }).

      when('/withdrawCash',{
        templateUrl:'partials/withdrawCash.html',
        controller:'withdrawCashCtrl'
      }).


      //帖子操作：新增、编辑
      when('/postOpt/:option',{
        templateUrl:'partials/postOpt.html',
        controller:'postOptCtrl'
      }).

      when('/homePage', {
        templateUrl: 'partials/homePage.html',
        controller: 'homePageCtrl'
      }).
      
      otherwise({
        redirectTo: '/homePage'
      });
  }]);
