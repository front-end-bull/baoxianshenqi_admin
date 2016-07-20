'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

// const IP = "182.254.212.33" //外网
// const IP = "192.168.0.109" //pp Mac
const KEY = "cbb4906093d48f827a7322d85af9ac52";
function formatTime(time){
    var month = time.getMonth()
    month++
    if(month<10){month="0"+month}
    // console.log("----month----"+month)

    var day = time.getDate()
    if(day<10){day="0"+day}
    // console.log("----day-----"+day)
      
    var hour = time.getHours()
    if(hour<10){hour="0"+hour}
    // console.log("----hour-----"+hour)

    var minute = time.getMinutes()
    if(minute<10){minute="0"+minute}

    var second = time.getSeconds()
    if(second<10){second="0"+second}

    var currentTime = time.getFullYear()+"-"+month+"-"+day+" "+hour+":"+minute+":"+second
    return currentTime
}


function formatTime_date(time){
    var month = time.getMonth()
    month++
    if(month<10){month="0"+month}
    // console.log("----month----"+month)


    var day = time.getDate()
    if(day<10){day="0"+day}
    // console.log("----day-----"+day)
      
    var hour = time.getHours()
    if(hour<10){hour="0"+hour}
    // console.log("----hour-----"+hour)

    var minute = time.getMinutes()
    if(minute<10){minute="0"+minute}

    var second = time.getSeconds()
    if(second<10){second="0"+second}

    var currentTime = time.getFullYear()+"-"+month+"-"+day
    return currentTime
}


function formatTime_time(time){
    var month = time.getMonth()
    month++
    if(month<10){month="0"+month}
    // console.log("----month----"+month)


    var day = time.getDate()
    if(day<10){day="0"+day}
    // console.log("----day-----"+day)
      
    var hour = time.getHours()
    if(hour<10){hour="0"+hour}
    // console.log("----hour-----"+hour)

    var minute = time.getMinutes()
    if(minute<10){minute="0"+minute}

    var second = time.getSeconds()
    if(second<10){second="0"+second}

    var currentTime = hour+":"+minute+":"+second
    return currentTime
}

function getPostfix(str){
  var patt = /.*\./
  var result = str.match(patt)
  var length = result[0].length
  var postfix = str.substring(length)
  return postfix
}

function isName(name,query){
        if(query!=='' && typeof query !=='undefined'){
          if(name.indexOf(query)>=0){
            return true
          }else{
            return false
          }
        }else{
          return true
        }
}

function timeIsTrue(time){
  if(time ==='' || typeof time === 'undefined'){
    return false
  }else{
    return true
  }
}

function isTime(time,startTime,endTime){
  time = new Date(time).getTime()
  if(timeIsTrue(startTime)&&timeIsTrue(endTime)){
    startTime = new Date(startTime+" 00:00:00").getTime()
    endTime = new Date(endTime+" 23:59:59").getTime()
    if(startTime<=time && time <=endTime){
      return true
    }else{
      return false
    }
  }else if(!timeIsTrue(startTime)&&timeIsTrue(endTime)){
    endTime = new Date(endTime+" 23:59:59").getTime()
    if(time<=endTime){
      return true
    }else{
      return false
    }
  }else if(timeIsTrue(startTime)&&!timeIsTrue(endTime)){
    startTime = new Date(startTime+" 00:00:00").getTime()
    if(startTime<=time){
      return true
    }else{
      return false
    }
  }else{
    return true
  }
}

function compareTime(startTime,endTime){
  if(timeIsTrue(startTime)&&timeIsTrue(endTime)){
    startTime = new Date(startTime+" 00:00:00").getTime()
    endTime = new Date(endTime+" 23:59:59").getTime()
    if(startTime>endTime){
      return false
    }
  }
  return true
}
//预约
phonecatControllers.controller('yuYueCtrl', ['$scope','$http',
  function($scope,$http) {
        $scope.test = 'error'
       
        $scope.beizhu = function(userid){
           $scope.test = userid
           
            $http.post('http://'+IP+':3000/list_person_yuyue_results',{userid:userid}).success(function(data){
              var yuyues = data.yuyue 

              var length = yuyues.length
              console.log(length)




              var offset = 150

              var top_start = 227+offset*(length-1)+'px'
              var html = '<textarea name="" id="beizhu" class="yuyue-text"></textarea><div class="yuyue-save"><a class="btn btn-success" href="javascript:void(0)" onclick="save()"><i class="glyphicon glyphicon-edit icon-white"></i> 添加</a></div><div class="stage"><div class="start">New</div><div class="first-line" style="height:'+top_start+'"></div>';

              for(var i = 0;i<length;i++){
                var y = i+1;

                var color = "#df5fe1"

                if(y%3==1){
                  color = "#df5fe1"
                }
                if(y%3==2){
                  color = "#46c9d1"
                }
                if(y%3==0){
                  color = "#45dcc6"
                }

                var top1 = 70+offset*i+'px'
                var top2 = 51+offset*i+'px'

                if(y%2==1){
                  html +='<div class="point" style="top:'+top1+'"><div class="inner" style="background-color:'+color+'"></div></div><div class="article" style="top:'+top2+'"><div class="title" style="background-color:'+color+'">'+y+'</div><div class="content">'+yuyues[i].yuyue_result+'</div><div class="triangle" style="background-color:'+color+'"></div></div>'
                  continue
                }
                if(y%2==0){
                  html +='<div class="point" style="top:'+top1+'"><div class="inner" style="background-color:'+color+'"></div></div><div class="article article-reverse" style="top:'+top2+'"><div class="title" style="background-color:'+color+'">'+y+'</div><div class="content">'+yuyues[i].yuyue_result+'</div><div class="triangle triangle-reverse" style="background-color:'+color+'"></div></div>'
                  continue
                }
                
              }

              var top_end = 275+offset*(length-1)+'px'
              html +='<div class="end" style="top:'+top_end+'">Old</div></div><input id="userid" type="hidden" value="'+userid+'">'
              +'<script>function save(){var userid=$("#userid").val();var result=$("#beizhu").val();if(result==""||result==undefined){layer.msg("备注不能为空!");return}$.ajax({url:"http://'+IP+':3000/finish_yuyue",type:"POST",data:{userid:userid,result:result},success:function(data){layer.msg("保存成功!");}})}</script>'

              // console.log(html)

             

              layer.open({
                  type: 1,
                  title:'添加备注',
                  skin: 'layui-layer-rim .beizhu-popup', //加上边框
                   closeBtn: 0, //不显示关闭按钮
                  shift: 2,
                  shadeClose: true, //开启遮罩关闭
                  area: ['800px', '500px'], //宽高
                  content: html,
                  end:function(){
                    $scope.query()
                  }
              });

              $(".layui-layer-title").css({"background-color": "#73a839","color":"white",border:"none"})
            })
        }

        $scope.query = function(){
          $http.get('http://'+IP+':3000/list_yuyue').success(function(data){
            console.log(data.users)
            var users = data.users
            var length = data.users.length

            $scope.totalCount = length
            $scope.users = users

          })
        }
       
       $scope.query()
  }]);


//预创建
phonecatControllers.controller('yuChuangJianCtrl', ['$scope','$http',
  function($scope,$http) {
    
  }]);

//跟进中
phonecatControllers.controller('genJinZhongCtrl', ['$scope','$http',
  function($scope,$http) {
    var allOrders
    // $scope.type = "agent_name"


    $scope.getAllOrders = function(){
       $http.post('http://'+IP+':3000/get_all_orders').success(function(data){
        var orders = data.orders
        allOrders = orders
        console.log(orders)
        var totalbaofei = 0




        for(var i in orders){
          var order = orders[i]

          if(order.baofei==''){order.baofei = 0}
          totalbaofei += order.baofei*100

          var order_status = order.order_status
          var inTime = ''
          var firsttime = ''
          order_status.forEach(function(e){
            if(e.status=="进入犹豫期"){
              inTime = parseInt(e.status_date)
            }
            if(e.status=="订单初始化"){
              firsttime = parseInt(e.createtime)
            }
          })


          firsttime = formatTime(new Date(firsttime))

          if(firsttime!='NaN-NaN-NaN NaN:NaN:NaN'){order.firsttime = firsttime}else{order.firsttime=''}

          var createTime_test = formatTime_date(new Date(order.createtime)) + " 00:00:00"

          var createTime = new Date(createTime_test).getTime()
          var currentTime = new  Date().getTime()
          var deadline = 6*24*60*60000


          order.createtime = formatTime(new Date(order.createtime))
          var status =  order.status
          

          

          if((status=="进入犹豫期"||status=="回访失败"||status=="回访成功")&&(currentTime-inTime>deadline)){
            // console.log(createTime_test)
            order.expire = 1
          }
        }






        $scope.orders = orders.sort(function(x,y){
          if(x.id<y.id){
            return 1
          }
          if(x.id>y.id){
            return -1
          }
          return 0
        })
        $scope.totalbaofei = totalbaofei/100


        $scope.totalNum = orders.length
      })
    }
   

    $scope.query = function(){

      var orders = []
      var totalbaofei = 0

      var agent_name = $scope.query_agent_name
      var customer_name = $scope.query_customer_name
      var gengxin_startTime = $('#gengxin_startTime').val()
      var gengxin_endTime = $('#gengxin_endTime').val()
      var chuangjian_startTime = $('#chuangjian_startTime').val()
      var chuangjian_endTime = $('#chuangjian_endTime').val()
      var status = $('#status').html()
      status = status.replace(/(^\s*)|(\s*$)/g,"")
      status = status.substring(0,status.length-64)
      // console.log(status)
      // console.log(agent_name)
      // console.log(customer_name)
      // console.log(gengxin_startTime)
      // console.log(gengxin_endTime)


     


      allOrders.forEach(function(e){
        if(   isName(e.agent_name,agent_name)
            &&isName(e.customer_name,customer_name)
            &&isTime(e.createtime,gengxin_startTime,gengxin_endTime)
            &&isTime(e.firsttime,chuangjian_startTime,chuangjian_endTime)
            &&(status=='全部'||status=='请选择最新状态'||status==e.status)
          ){
          totalbaofei += e.baofei*100
          orders.push(e)
        }
      })

      // console.log(start_time)
      // console.log(end_time)


      // var type = $scope.type
      // var queryStr = $scope.queryStr

      // if(typeof queryStr === 'undefined' || queryStr ==''){ 
      //   $scope.orders = allOrders 
      //   $scope.totalNum = allOrders.length 
      //   return 
      // }

      // allOrders.forEach(function(e){
      //   if(eval('e.'+type+'.indexOf(queryStr)>=0')){
      //     orders.push(e)
      //   }
      // })

      $scope.orders = orders
      $scope.totalbaofei = totalbaofei/100
      $scope.totalNum = orders.length

    }

    $scope.clear = function(){
      $scope.query_agent_name = ''
      $scope.query_customer_name = ''
      $('#chuangjian_startTime').val('')
      $('#chuangjian_endTime').val('')
      $('#gengxin_startTime').val('')
      $('#gengxin_endTime').val('')
      $('#status').html('全部'+' <span class="caret" style="float:right;margin-top:9px;"></span>')
    }

    
    $scope.copyOrder = function(){
      layer.prompt(
        {
          title: '请输入要复制的订单号',
          formType: 0 //prompt风格，支持0-2
        }, function(pass){
          var order_id = pass
          

          var isExist = false
          allOrders.forEach(function(e){
            if(e.id == order_id){
              isExist = true
            }
          })

          if(isExist){
            $http.post('http://'+IP+':3000/get_one_order',{orderid:order_id}).success(function(data){
                // console.log(data)
                var order = data.order
                // console.log(order)
                var postData = {}
                postData.userid = order.agent_id
                postData.order = order.order_content
                postData.order.yongjin = order.yongjin
                $http.post('http://'+IP+':3000/add_order',postData).success(function(data){
                  // console.log(data)
                  layer.msg('复制成功!')
                  $scope.getAllOrders()
                  $scope.query()
                })//add_order
            })//get_one_order
          }else{
            layer.msg('该订单不存在，请重新输入!')
          }
        })//layer.prompt
    }//$scope.copyOrder



    $scope.delOrder = function(){
      layer.prompt(
        {
          title: '请输入要删除的订单号',
          formType: 0 //prompt风格，支持0-2
        }, function(pass){
          var order_id = pass
          

          var isExist = false
          allOrders.forEach(function(e){
            if(e.id == order_id){
              isExist = true
            }
          })

          if(isExist){
            $http.post('http://'+IP+':3000/delete_order',{orderid:order_id,key:KEY}).success(function(data){
                  layer.msg('删除成功!')
                  $scope.getAllOrders()
                  $scope.query()
            })//get_one_order
          }else{
            layer.msg('该订单不存在，请重新输入!')
          }
        })//layer.prompt
    }//$scope.copyOrder
    $scope.getAllOrders()
  }]);

//新增订单
phonecatControllers.controller('xinZengDingDanCtrl', ['$scope','$http',
  function($scope,$http) {

    var isFirst = true

    $scope.change_uid = function(){
      var uid = $scope.uid
        $scope.name = ""
        $scope.company = ""
        $scope.phonenumber = ""
      if(uid==""||uid=="null"||uid=="undefined"){return}
      $http.post('http://'+IP+':3000/get_user_info',{userid:uid}).success(function(data){
        $scope.name = data.name
        $scope.company = data.company
        $scope.phonenumber = data.phonenumber

      })
    }

    $scope.post = function(){
        
        if(!isFirst){layer.msg('您已经添加过！');return}

        isFirst = false

        var totalBaoe = 0
        var totalBaofee = 0


        //-start-产品信息
          var blockList = JSON.parse($('#blockList').val())
          var block_length = blockList.length
          var block_Array = []
          for(var i=1;i<=block_length;i++){
            eval("if(blockList.a_block"+i+"==1){var block"+i+"={};block"+i+".product_id = $('#block"+i+"_name').val();block"+i+".baoe = $('#block"+i+"_baoe').val();block"+i+".baofee = $('#block"+i+"_baofee').val();block"+i+".baozhangqijian = $('#block"+i+"_baozhangqijian').val();block"+i+".jiaofeinianxian = $('#block"+i+"_jiaofeinianxian').val();block_Array.push(block"+i+");}")
          }
          // console.log(block_Array)
        //-end-产品信息


        //-start-被保人信息
          var beibaorenList = JSON.parse($('#beibaorenList').val())
          // console.log(beibaorenList)
          var beibaoren_length = beibaorenList.length
          var beibaoren_Array = []
          for(var j=1;j<=beibaoren_length;j++){
            eval("if(beibaorenList.a_beibaoren"+j+"==1){var beibaoren"+j+"={};beibaoren"+j+".name = $('#beibaoren"+j+"_name').val();beibaoren"+j+".age = $('#beibaoren"+j+"_age').val();beibaoren"+j+".gender = $('#beibaoren"+j+"_gender').val();beibaoren"+j+".id = $('#beibaoren"+j+"_ID').val();beibaoren"+j+".relationship = $('#beibaoren"+j+"_relationship').val();beibaoren"+j+".phone = $('#beibaoren"+j+"_phone').val();beibaoren_Array.push(beibaoren"+j+");}")
          }
          // console.log(beibaoren_Array)
        //-end-被保人信息


        //-start-受益人信息
          var shouyirenList = JSON.parse($('#shouyirenList').val())
          // console.log(shouyirenList)
          var shouyiren_length = shouyirenList.length
          var shouyiren_Array = []
          for(var j=1;j<=shouyiren_length;j++){
            eval("if(shouyirenList.a_shouyiren"+j+"==1){var shouyiren"+j+"={};shouyiren"+j+".name = $('#shouyiren"+j+"_name').val();shouyiren"+j+".age = $('#shouyiren"+j+"_age').val();shouyiren"+j+".gender = $('#shouyiren"+j+"_gender').val();shouyiren"+j+".id = $('#shouyiren"+j+"_ID').val();shouyiren"+j+".relationship = $('#shouyiren"+j+"_relationship').val();shouyiren"+j+".phone = $('#shouyiren"+j+"_phone').val();shouyiren_Array.push(shouyiren"+j+");}")
          }
          // console.log(shouyiren_Array)
        //-end-受益人信息


        var toubaoren = {}
        toubaoren.name = $scope.toubaoren_name
        toubaoren.gender = $scope.toubaoren_gender
        toubaoren.id = $scope.toubaoren_id
        toubaoren.bankNum = $scope.toubaoren_bankNum
        toubaoren.age = $scope.toubaoren_age
        toubaoren.phone = $scope.toubaoren_phone

        var postData = {}
        postData.userid = $scope.uid
        postData.order = {}
        postData.order.products = block_Array
        postData.order.beibaoren = beibaoren_Array[0]
        postData.order.shouyirens = shouyiren_Array 
        postData.order.toubaoren = toubaoren
        postData.order.yongjin = $scope.yongjin

        // console.log(postData)
        // console.log(JSON.stringify(postData))

        $http.post('http://'+IP+':3000/add_order',postData).success(function(data){
            // console.log(data)
            layer.msg('新增成功!')

        })
    }

  }]);


//编辑订单
phonecatControllers.controller('bianJiDingDanCtrl', ['$scope','$http','$routeParams',
  function($scope,$http,$routeParams) {

    var isFirst = true

      //-start-产品信息配置 
        var block_num = 1 
        var color 
        var blockList = {}
        //1有效，0被删除
        blockList.a_block1 = 1 
        blockList.length = 1
        $('#blockList').val(JSON.stringify(blockList))

        function add_block(){
          blockList = JSON.parse($('#blockList').val())
          var i = block_num 
          block_num++
          blockList.length = block_num
          // console.log(block_num)
          eval("blockList.a_block"+block_num+" = 1")

          if(block_num%3==2){color="#ff8f2e"}
          if(block_num%3==0){color="#2fa4e7"}
          if(block_num%3==1){color="#2bd394"}
          var html = '<div style="background-color:'+color+';color:#fff;padding-top:10px;padding-bottom:10px;border-radius:20px;position:relative" id="a_block'+block_num+'"><div class="paper-row row"><div class="col-md-1" style="padding-right:0">产品名称:</div><div class="col-md-2" style="padding-left:0"><select id="block'+block_num+'_name" style="color:black"><option value="7165">泰康乐安康</option><option value="7167">华夏健康人生</option> <option value="7160">华夏常青树2015</option><option value="7238">华夏福临门铂金版2015</option><option value="7273">弘康健康人生重大疾病A款（附加轻症）</option></select></div><div class="col-md-1"></div><div class="col-md-1" style="padding-right:0">保额:</div><div class="col-md-2 add-yuan" style="padding-left:0"><input id="block'+block_num+'_baoe"></div><div class="col-md-1"></div><div class="col-md-1" style="padding-right:0">保费:</div><div class="col-md-2 add-yuan" style="padding-left:0"><input id="block'+block_num+'_baofee"></div><div class="col-md-1"></div></div><div class="paper-row row"><div class="col-md-1" style="padding-right:0">保障期间:</div><div class="col-md-2 add-year" style="padding-left:0"><input id="block'+block_num+'_baozhangqijian"></div><div class="col-md-1"></div><div class="col-md-1" style="padding-right:0">缴费年限:</div><div class="col-md-2 add-year" style="padding-left:0"><input id="block'+block_num+'_jiaofeinianxian"></div><div class="col-md-1"></div></div><div style="position:absolute;left:100%;top:10px;margin-left:-30px" id="block'+block_num+'" onclick="delete_block(this.id)"><i class="glyphicon glyphicon-remove"></i></div></div>';
          $('#a_block'+i).after(html)
          $('#blockList').val(JSON.stringify(blockList))
        }

        function delBlock(id){
            $('#a_'+id).css('display','none')
            eval("blockList.a_"+id+"=0")
            $('#blockList').val(JSON.stringify(blockList))
        }
      //-end-产品信息配置 


      //-start-受益人信息配置 
        var shouyiren_num = 1
        var shouyirenList = {}
        //1有效，0被删除
        shouyirenList.a_shouyiren1 = 1 
        shouyirenList.length = 1
        $('#shouyirenList').val(JSON.stringify(shouyirenList))
        function add_shouyiren(){
          shouyirenList = JSON.parse($('#shouyirenList').val())
          var i = shouyiren_num
          shouyiren_num++
          shouyirenList.length = shouyiren_num
          eval("shouyirenList.a_shouyiren"+shouyiren_num+" = 1")
          // $('#a_shouyiren'+i).after(html)
          var html = '<div id="a_shouyiren'+shouyiren_num+'" style="border-top:1px dashed #848484;margin-top:30px;position:relative"><div class="paper-row row" style="margin-top:20px"><div class="col-md-1" style="padding-right:0">姓名:</div><div class="col-md-2" style="padding-left:0"><input id="shouyiren'+shouyiren_num+'_name"></div><div class="col-md-1"></div><div class="col-md-1" style="padding-right:0">性别:</div><div class="col-md-2" style="padding-left:0"><select id="shouyiren'+shouyiren_num+'_gender"><option value="0">男</option><option value="1">女</option></select></div><div class="col-md-1"></div><div class="col-md-1" style="padding-right:0">身份证号:</div><div class="col-md-2" style="padding-left:0"><input id="shouyiren'+shouyiren_num+'_ID"></div><div class="col-md-1"></div></div><div class="paper-row row"><div class="col-md-1" style="padding-right: 0;" >年龄:</div><div class="col-md-2 add-sui" style="padding-left: 0;"><input id="shouyiren'+shouyiren_num+'_age"></input></div><div class="col-md-1"></div><div class="col-md-1" style="padding-right:0">与投保人</div><div class="col-md-2 add-guanxi" style="padding-left:0"><select id="shouyiren'+shouyiren_num+'_relationship"><option value="1">本人</option><option value="2">夫妻</option><option value="3">父子</option><option value="4">母子</option><option value="5">其他</option></select></div>'+'<div class="col-md-1"></div><div class="col-md-1" style="padding-right: 0;">手机:</div><div class="col-md-2" style="padding-left: 0;"><input id="shouyiren'+shouyiren_num+'_phone"></input></div><div class="col-md-1"></div>'+'</div><div style="position:absolute;left:100%;top:10px;margin-left:-30px;color:red" id="shouyiren'+shouyiren_num+'" onclick="delete_shouyiren(this.id)"><i class="glyphicon glyphicon-remove"></i></div></div>';
          $('#a_shouyiren'+i).after(html)
          $('#shouyirenList').val(JSON.stringify(shouyirenList))
        }
      //-end-受益人信息配置 


      var statusList
      var fujianList


      var order_id = $routeParams.order_id
      var uid 
      $scope.order_id = order_id
      // console.log(order_id)

      $scope.add_block = function(){
        add_block()
      }

      $scope.delete_block = function(event){
        var html = event.currentTarget.outerHTML
        var patt = /block\d/
        var result = html.match(patt)
        var id = result[0]
        delBlock(id)
      }

      $scope.add_shouyiren = function(){
        add_shouyiren()
      }

      $scope.query = function(){
          $http.post('http://'+IP+':3000/get_one_order',{orderid:order_id}).success(function(data){
            // console.log(data)
            var order = data.order
            if(order.id==order_id){
              $scope.name = order.agent_name


              fujianList = order.fujian

              var status = order.order_status


              for(var m in status){
                var s = status[m]
                if(s.status_date==null||s.status_date==""){
                  s.date = ""
                  s.time = ""
                }else{
                  s.status_date = parseInt(s.status_date,10)
                  s.date = formatTime_date(new Date(s.status_date))
                  s.time = formatTime_time(new Date(s.status_date))
                }
              }

              $scope.status = status
              statusList = status
              // console.log(status)


              if(isFirst){

                $scope.uid = order.agent_id
                uid = order.agent_id
                $scope.yongjin = order.yongjin

                var content = order.order_content


                // console.log(content.toubaoren)

                $scope.toubaoren_name = content.toubaoren.name
                $scope.toubaoren_id = content.toubaoren.id
                $scope.toubaoren_gender = content.toubaoren.gender
                $scope.toubaoren_bankNum = content.toubaoren.bankNum
                $scope.toubaoren_age = content.toubaoren.age
                $scope.toubaoren_phone = content.toubaoren.phone

                $scope.beibaoren_name = content.beibaoren.name
                $scope.beibaoren_id = content.beibaoren.id
                $scope.beibaoren_age = content.beibaoren.age
                $scope.beibaoren_gender = content.beibaoren.gender
                $scope.beibaoren_relationship = content.beibaoren.relationship
                $scope.beibaoren_phone = content.beibaoren.phone


                var products = content.products
                var products_length = products.length
                for(var j=0;j<products_length;j++){
                  if(j!=0){add_block()}                
                  var product = products[j]
                  var h = j+1
                  $("#block"+h+"_name").val(product.product_id)
                  $("#block"+h+"_baoe").val(product.baoe)
                  $("#block"+h+"_baofee").val(product.baofee)
                  $("#block"+h+"_baozhangqijian").val(product.baozhangqijian)
                  $("#block"+h+"_jiaofeinianxian").val(product.jiaofeinianxian)
                }


                var shouyirens = content.shouyirens
                var shouyirens_length = shouyirens.length

                for(var j=0;j<shouyirens_length;j++){
                  if(j!=0){
                    add_shouyiren()
                  }                
                  var shouyiren = shouyirens[j]
                  var h = j+1
                  $("#shouyiren"+h+"_name").val(shouyiren.name)
                  $("#shouyiren"+h+"_gender").val(shouyiren.gender)
                  $("#shouyiren"+h+"_ID").val(shouyiren.id)
                  $("#shouyiren"+h+"_age").val(shouyiren.age)
                  $("#shouyiren"+h+"_relationship").val(shouyiren.relationship)
                  $("#shouyiren"+h+"_phone").val(shouyiren.phone)
                }
              }
              isFirst = false

            }
        })
      }

      $scope.del = function(seq){
        $http.post('http://'+IP+':3000/delete_order_status',{"orderid":order_id,"seq":seq}).success(function(data){
          layer.msg('删除成功')
          $scope.query()
        })
      }

      $scope.addStatus = function(){
        var html = '<div class="clearfix"><div style="padding:20px;float:left;">最新状态: &nbsp;<select id="status" style="font-size:20px;"><option value="0">订单初始化</option><option value="2">已预约面签</option><option value="3">材料有误</option><option value="4">材料已提交保险公司</option><option value="5">通知体检</option><option value="6">拒保,订单取消</option><option value="7">调整保费</option><option value="8">拒绝,订单取消</option><option value="9">同意调整保费</option><option value="10">划款失败</option><option value="18">划款成功</option><option value="19">保险公司下发合同</option><option value="11">到时限后弃保</option><option value="12">合同已转交</option><option value="14">进入犹豫期</option><option value="13">回执已提交保险公司</option><option value="15">回访失败</option><option value="16">回访成功</option><option value="17">佣金已结</option></select></div>'+
        '<div style="padding:20px;float:left;">更新时间: &nbsp;<input id="status_date" style="padding-left:8px;" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})"></div></div>'+
        '<div class="tab-container clearfix"><span style="border-right:1px solid #848484;border-bottom:0" onclick="tab(this.id)" id="tab1">上传资料</span> <span style="border-right:1px solid #848484" onclick="tab(this.id)" id="tab2">寄送方式</span> <span style="border-right:1px solid #848484" onclick="tab(this.id)" id="tab3">备注</span> <span id="tab4">&nbsp;</span></div><div class="tab" id="c_tab1" style="padding-top:20px;padding-left:20px;">注：请修改好文件名再上传。<br><br><input type="file" id="file" multiple="true" onchange="upload()"><br><span id="upload_results">上传结果：</span></div><div class="tab" id="c_tab2" style="display:none"><div class="radios clearfix"><div class="radio-group" style="float:left"><input type="radio">&nbsp;自选</div><div class="radio-group" style="float:left;margin-left:100px"><input type="radio">&nbsp;快递</div></div><div class="input-group" style="margin-top:30px">快递公司：<input type="text" placeholder="请输入快递公司" style="width:300px;height:30px;padding:5px"></div><div class="input-group" style="margin-top:30px">快递单号：<input type="text" placeholder="请输入快递单号" style="width:300px;height:30px;padding:5px"></div></div><div class="tab" id="c_tab3" style="display:none;position:relative"><textarea id="beizhu"></textarea></div><div class="tab" id="c_tab4" style="display:none;position:relative"></div><div class="yuyue-save"><a class="btn btn-success" href="javascript:void(0)" onclick="save()"><i class="glyphicon glyphicon-edit icon-white"></i> 添加</a></div><input id="order_id" type="hidden" value="'+order_id+'">'+
        '<script>'+
        'var fujianList=[];var fujian={};function Qiniu_upload(file,token,key,oldName){var xhr=new XMLHttpRequest();xhr.open(\'POST\',URL,true);var formData=new FormData();if(key!==null&&key!==undefined){formData.append(\'key\',key)};formData.append(\'token\',token);formData.append(\'file\',file);xhr.onreadystatechange=function(response){if(xhr.readyState==4&&xhr.status==200&&xhr.responseText!=""){var blkRet=JSON.parse(xhr.responseText);layer.msg(\'上传成功\');var url=\'http://7xrfbc.com2.z0.glb.qiniucdn.com/\'+blkRet.key;var html=\'<a href="http://7xrfbc.com2.z0.glb.qiniucdn.com/\'+blkRet.key+\'" style="margin-left:20px;">\'+oldName+\'</a>\';$(\'#upload_results\').after(html);fujian={};fujian.name=oldName;fujian.url=url;fujianList.push(fujian);console.log(JSON.stringify(fujianList));$(\'#fujianList\').val(JSON.stringify(fujianList))}else if(xhr.status!=200&&xhr.responseText){var blkRet=JSON.parse(xhr.responseText)}};xhr.send(formData)};'+
        'function tab(o){$("#c_tab1").hide(),$("#c_tab2").hide(),$("#c_tab3").hide(),$("#c_tab4").hide(),$("#c_"+o).show(),$("#tab1").css({"border-bottom":"1px solid #848484"}),$("#tab2").css({"border-bottom":"1px solid #848484"}),$("#tab3").css({"border-bottom":"1px solid #848484"}),$("#tab4").css({"border-bottom":"1px solid #848484"}),$("#"+o).css({"border-bottom":"0"})}function save(){var order_id=$("#order_id").val();var status=$("#status").val();var status_date = $("#status_date").val();console.log(status_date);if(status_date==null||status_date==""){}else{status_date=new Date(status_date).getTime()};var value=$("#beizhu").val();var status_content = $("#beizhu").val();'+
        'console.log(fujianList);for(var i in fujianList){if(i==0){value=value+"\\n\\n附件详情如下:"};var fujian=fujianList[i];var name=fujian.name;var url=fujian.url;value=value+"\\n"+name+": "+url};console.log(value);$.ajax({url:"http://'+IP+':3000/add_order_status",type:"POST",data:{orderid:order_id,status_id:status,value:value,'+

        'status_date:status_date,status_content:status_content'+//状态更新时间

        '},success:function(data){var seq=JSON.parse(data).seq;var uid=$("#uid").val();for(var i in fujianList){var fujian=fujianList[i];var name=fujian.name;var url=fujian.url;(function(name,url){var fujianData={orderid:order_id,seq:seq,name:name,url:url,userid:uid};'+
        'console.log(fujianData);$.ajax({url:"http://"+IP+":3000/add_fujian",type:"POST",data:fujianData,success:function(data){'+
        '}})})(name,url)};layer.msg("保存成功!")}})}function upload(){'+

        'var files = $("#file")[0].files;var time=Math.round(new Date().getTime()/1000)+3600;var order_id = $("#order_id").val();var status = $("#status").val();console.log(" -status "+status);for(var f=0;f<files.length;f++){var file=files[f];var key=order_id+"_"+status+"_"+new Date().getTime()+"_"+f+"."+getPostfix(file.name);var oldName = file.name;file.name = key;var putPolicy={scope:"dingdanguanlixitong:"+key,deadline:time};console.log(file);Qiniu_upload(file,getToken(putPolicy),key,oldName)}};</script>';
          layer.open({
            type: 1,
            title:'添加状态',
            skin: 'layui-layer-rim .beizhu-popup', //加上边框
             closeBtn: 0, //不显示关闭按钮
            shift: 2,
            shadeClose: true, //开启遮罩关闭
            area: ['900px', '580px'], //宽高
            content: html,
            end:function(){
              $scope.query()
            }
        });

        $(".layui-layer-title").css({"background-color": "#2fa4e7","color":"white",border:"none"})
      }

      $scope.updateStatus = function(seq){
        //初始化数据
        var currentStatus
        for(var i in statusList){
          var status = statusList[i]
          if(status.seq == seq){
            currentStatus = status
            break
          }
        }

        // console.log(currentStatus)

        var status_id = currentStatus.status_id
        var status_date = currentStatus.status_date

        // console.log(currentStatus.status_date)

        if(status_date==null||status_date==""){
        }else{
          status_date=parseInt(status_date,10);
          status_date = formatTime(new Date(status_date))
        }

        

        if(!currentStatus.status_content){
          currentStatus.status_content = ""
        }
        var beizhu = currentStatus.status_content

        // if(beizhu==""){beizhu="\\r\\n"}

        beizhu = beizhu.replace(/[\r\n]/g,"Batman")
        // console.log(beizhu)
        var fujians =[]


        var html_fujians =''

        for(var f in fujianList){
          var fujian = fujianList[f]
          if(fujian.orderid==order_id&&fujian.seq==seq){
            fujians.push(fujian)
            // console.log(fujian)
            html_fujians += '<span id=\'span_fujian'+f+'\' style=\'margin-right:30px;\'><a href=\''+fujian.url+'\' >'+fujian.name+'</a><span style=\'color:red;padding-left:5px;\' id=\'fujian'+f+'\' onclick=\'del_fujian('+fujian.id+',this.id)\'>x</span></span>'
            // console.log(fujian)
          }
        }
        // console.log(html_fujians)
        // console.log(fujians)

        var length = fujianList.length

        var html = '<div class="clearfix"><div style="padding:20px;float:left;">最新状态: &nbsp;<select id="status" style="font-size:20px;"><option value="0">订单初始化</option><option value="2">已预约面签</option><option value="3">材料有误</option><option value="4">材料已提交保险公司</option><option value="5">通知体检</option><option value="6">拒保,订单取消</option><option value="7">调整保费</option><option value="8">拒绝,订单取消</option><option value="9">同意调整保费</option><option value="10">划款失败</option><option value="18">划款成功</option><option value="19">保险公司下发合同</option><option value="11">到时限后弃保</option><option value="12">合同已转交</option><option value="14">进入犹豫期</option><option value="13">回执已提交保险公司</option><option value="15">回访失败</option><option value="16">回访成功</option><option value="17">佣金已结</option></select></div>'+
        '<div style="padding:20px;float:left;">更新时间: &nbsp;<input id="status_date" style="padding-left:8px;" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})"></div></div>'+
        '<div class="tab-container clearfix"><span style="border-right:1px solid #848484;border-bottom:0" onclick="tab(this.id)" id="tab1">上传资料</span> <span style="border-right:1px solid #848484" onclick="tab(this.id)" id="tab2">寄送方式</span> <span style="border-right:1px solid #848484" onclick="tab(this.id)" id="tab3">备注</span> <span id="tab4">&nbsp;</span></div><div class="tab" id="c_tab1" style="padding:20px;">注：请修改好文件名再上传。<br><br><input type="file" id="file" onchange="upload()" multiple="true"><br><span id="upload_results">上传结果：</span></div><div class="tab" id="c_tab2" style="display:none"><div class="radios clearfix"><div class="radio-group" style="float:left"><input type="radio">&nbsp;自选</div><div class="radio-group" style="float:left;margin-left:100px"><input type="radio">&nbsp;快递</div></div><div class="input-group" style="margin-top:30px">快递公司：<input type="text" placeholder="请输入快递公司" style="width:300px;height:30px;padding:5px"></div><div class="input-group" style="margin-top:30px">快递单号：<input type="text" placeholder="请输入快递单号" style="width:300px;height:30px;padding:5px"></div></div><div class="tab" id="c_tab3" style="display:none;position:relative"><textarea id="beizhu"></textarea></div><div class="tab" id="c_tab4" style="display:none;position:relative"></div><div class="yuyue-save"><a class="btn btn-success" href="javascript:void(0)" onclick="save()"><i class="glyphicon glyphicon-edit icon-white"></i> 保存</a></div><input id="order_id" type="hidden" value="'+order_id+'"><script type="text/javascript">'+
         'var length = '+length+';var fujianList =\''+JSON.stringify(fujians)+'\';fujianList = JSON.parse(fujianList);var fujian={};function Qiniu_upload(file,token,key,oldName){var xhr=new XMLHttpRequest();xhr.open(\'POST\',URL,true);var formData=new FormData();if(key!==null&&key!==undefined){formData.append(\'key\',key)};formData.append(\'token\',token);formData.append(\'file\',file);xhr.onreadystatechange=function(response){if(xhr.readyState==4&&xhr.status==200&&xhr.responseText!=""){var blkRet=JSON.parse(xhr.responseText);layer.msg(\'上传成功\');'+'var url=\'http://7xrfbc.com2.z0.glb.qiniucdn.com/\'+blkRet.key;'+
         


         'var html=\'<a href="http://7xrfbc.com2.z0.glb.qiniucdn.com/\'+blkRet.key+\'" style="margin-right:30px;">\'+oldName+\'</a>\';'+

         '$(\'#upload_results\').after(html);fujian={};fujian.name=oldName;fujian.url=url;fujianList.push(fujian);$(\'#fujianList\').val(JSON.stringify(fujianList))}else if(xhr.status!=200&&xhr.responseText){var blkRet=JSON.parse(xhr.responseText)}};xhr.send(formData)};'+        
         '$("#status").val('+status_id+');$("#status_date").val("'+status_date+'");var beizhu_format = "'+beizhu+'";'+
         'var str = beizhu_format;'+
         '$("#beizhu").val(str.replace(/Batman/g,"\\r\\n"));'+
         '$("#upload_results").after("'+html_fujians+'");'+
         'function tab(o){$("#c_tab1").hide(),$("#c_tab2").hide(),$("#c_tab3").hide(),$("#c_tab4").hide(),$("#c_"+o).show(),$("#tab1").css({"border-bottom":"1px solid #848484"}),$("#tab2").css({"border-bottom":"1px solid #848484"}),$("#tab3").css({"border-bottom":"1px solid #848484"}),$("#tab4").css({"border-bottom":"1px solid #848484"}),$("#"+o).css({"border-bottom":"0"})}function save(){ var order_id = $("#order_id").val(); $.ajax({url:"http://'+IP+':3000/delete_fujian_by_seq",type:"POST",data:{orderid:order_id,seq:'+seq+'},success:function(data){console.log("delete!");console.log(data)}});var status = $("#status").val(); var value = $("#beizhu").val();var status_content = $("#beizhu").val();for(var i in fujianList){if(i==0){value=value+"\\n\\n附件详情如下:";};var fujian=fujianList[i];var name=fujian.name;var url=fujian.url;value = value+"\\n"+name+" :"+url;};'+
         'var statusid = $("#status").val();var status_date = new Date($("#status_date").val()).getTime();$.ajax({ url: "http://'+IP+':3000/update_order_status", type:"POST", data:{orderid:order_id,seq:'+seq+',statusid:statusid,value:value,status_date:status_date,status_content:status_content}, success: function(data){var seq = '+seq+';var uid=$("#uid").val();for(var i in fujianList){var fujian=fujianList[i];var name=fujian.name;var url=fujian.url;var fujianData={orderid:order_id,seq:seq,name:name,url:url,userid:uid};$.ajax({url:"http://"+IP+":3000/add_fujian",type:"POST",data:fujianData,success:function(data){}})};layer.msg("修改成功!"); } }); };'+
         'function upload(){var files = $("#file")[0].files;var time=Math.round(new Date().getTime()/1000)+3600;var order_id = $("#order_id").val();var status = $("#status").val();console.log(" -status "+status);for(var f=0;f<files.length;f++){var file=files[f];var key=order_id+"_"+status+"_"+new Date().getTime()+"_"+f+"."+getPostfix(file.name);var oldName = file.name;file.name = key;var putPolicy={scope:"dingdanguanlixitong:"+key,deadline:time};console.log(file);Qiniu_upload(file,getToken(putPolicy),key,oldName)}};'+
         'function del_fujian(id,this_id){$("#span_"+this_id).hide();'+
            '$.ajax({ url: "http://'+IP+':3000/delete_fujian", '+
                      'type:"POST",'+
                      'data:{id:id},'+
                      'success: function(data){console.log(data);for(var fo in fujianList){var o=fujianList[fo];if(o.id==id){fujianList.splice(fo,1);}};save();}'+
                      '}); }</script>';


        layer.open({
            type: 1,
            title:'编辑状态',
            skin: 'layui-layer-rim .beizhu-popup', //加上边框
             closeBtn: 0, //不显示关闭按钮
            shift: 2,
            shadeClose: true, //开启遮罩关闭
            area: ['900px', '580px'], //宽高
            content: html,
            end:function(){
              $scope.query()
            }
        });

        $(".layui-layer-title").css({"background-color": "#2fa4e7","color":"white",border:"none"})

      }

      $scope.post = function(){
       
          var totalBaoe = 0
          var totalBaofee = 0


          //-start-产品信息
            var blockList = JSON.parse($('#blockList').val())
            var block_length = blockList.length
            var block_Array = []
            for(var i=1;i<=block_length;i++){
              eval("if(blockList.a_block"+i+"==1){var block"+i+"={};block"+i+".product_id = $('#block"+i+"_name').val();block"+i+".baoe = $('#block"+i+"_baoe').val();block"+i+".baofee = $('#block"+i+"_baofee').val();block"+i+".baozhangqijian = $('#block"+i+"_baozhangqijian').val();block"+i+".jiaofeinianxian = $('#block"+i+"_jiaofeinianxian').val();block_Array.push(block"+i+");}")
            }
            // console.log(block_Array)
          //-end-产品信息


          //-start-被保人信息
            var beibaorenList = JSON.parse($('#beibaorenList').val())
            // console.log(beibaorenList)
            var beibaoren_length = beibaorenList.length
            var beibaoren_Array = []
            for(var j=1;j<=beibaoren_length;j++){
              eval("if(beibaorenList.a_beibaoren"+j+"==1){var beibaoren"+j+"={};beibaoren"+j+".name = $('#beibaoren"+j+"_name').val();beibaoren"+j+".age = $('#beibaoren"+j+"_age').val();beibaoren"+j+".gender = $('#beibaoren"+j+"_gender').val();beibaoren"+j+".id = $('#beibaoren"+j+"_ID').val();beibaoren"+j+".relationship = $('#beibaoren"+j+"_relationship').val();beibaoren"+j+".phone = $('#beibaoren"+j+"_phone').val();beibaoren_Array.push(beibaoren"+j+");}")
            }
            // console.log(beibaoren_Array)
          //-end-被保人信息


          //-start-受益人信息
            var shouyirenList = JSON.parse($('#shouyirenList').val())
            // console.log(shouyirenList)
            var shouyiren_length = shouyirenList.length
            var shouyiren_Array = []
            for(var j=1;j<=shouyiren_length;j++){
              eval("if(shouyirenList.a_shouyiren"+j+"==1){var shouyiren"+j+"={};shouyiren"+j+".name = $('#shouyiren"+j+"_name').val();shouyiren"+j+".age = $('#shouyiren"+j+"_age').val();shouyiren"+j+".gender = $('#shouyiren"+j+"_gender').val();shouyiren"+j+".id = $('#shouyiren"+j+"_ID').val();shouyiren"+j+".relationship = $('#shouyiren"+j+"_relationship').val();shouyiren"+j+".phone = $('#shouyiren"+j+"_phone').val();shouyiren_Array.push(shouyiren"+j+");}")
            }
            // console.log(shouyiren_Array)
          //-end-受益人信息


          var toubaoren = {}
          toubaoren.name = $scope.toubaoren_name
          toubaoren.gender = $scope.toubaoren_gender
          toubaoren.id = $scope.toubaoren_id
          toubaoren.bankNum = $scope.toubaoren_bankNum
          toubaoren.age = $scope.toubaoren_age
          toubaoren.phone = $scope.toubaoren_phone

          var postData = {}
          postData.orderid = order_id
          postData.userid = $scope.uid
          postData.order = {}
          postData.order.products = block_Array
          postData.order.beibaoren = beibaoren_Array[0]
          postData.order.shouyirens = shouyiren_Array 
          postData.order.toubaoren = toubaoren
          postData.order.yongjin = $scope.yongjin

          console.log(postData)
          // console.log(JSON.stringify(postData))

          $http.post('http://'+IP+':3000/update_order',postData).success(function(data){
              // console.log(data)
              layer.msg('修改成功!')

          })
      }

      $scope.query()
  }]);


//代理人查询
phonecatControllers.controller('daiLiRenChaXunCtrl', ['$scope','$http',
  function($scope,$http) {

    $scope.type = "id"
    // $scope.queryStr = "彭鹏"

    var isChange = false

    $scope.query = function(){
      var type = $scope.type
      var queryStr = $scope.queryStr

      var postData = {
        q:queryStr,
        type:type
      }

      $http.post('http://'+IP+':3000/query_users',postData).success(function(data){
        // console.log(data)   
        // console.log(data.users)
        var users = data.users
        for(var i in users){
          console.log(' -第'+i+'位: '+users[i])
          users[i] = JSON.parse(users[i])
        }
        $scope.users = users  

      })
    }

    $scope.isChange = function(){
      // console.log(isChange)
      isChange = true
    }


    $scope.updateName = function(id,name){
      // console.log(id)
      // console.log(name)
      // console.log(isChange)
      if(isChange){
        var KEY = "cbb4906093d48f827a7322d85af9ac52"

        $http.get('http://'+IP+':3000/change_username?key='+KEY+'&userid='+id+'&username='+name).success(function(data){
          layer.msg('姓名修改成功!')
        })
        isChange = false
      }
    }
  }]);

//推荐联系人列表
phonecatControllers.controller('tuiJianLianXiRenCtrl', ['$scope','$http',
  function($scope,$http) {
    
  }]);


//首页
phonecatControllers.controller('homePageCtrl', ['$scope','$http',
  function($scope,$http) {
    
  }]);




