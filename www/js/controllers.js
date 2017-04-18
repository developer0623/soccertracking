angular.module('app.controllers', ['ionic', 'ionic.cloud'])
.controller('pageCtrl', function($scope,$http,$state,$rootScope,$ionicHistory, $ionicPlatform, $ionicPopup, $ionicPush) {
    orientationUI();


    $ionicPush.register().then(function(t) {
      return $ionicPush.saveToken(t);
    }).then(function(t) {
        // alert("Token saved"+ t.token);
         console.log('Token saved:' + t.token);
    });

  $scope.$on('cloud:push:notification', function(event, data) {
    var msg = data.message;
    var confirmPopup = $ionicPopup.confirm({
        title: msg.title,
        template: msg.text,
        okText: "Ok"
      });

      // confirmPopup.then(function(res) {
      //   if(res) {
      //      window.open(msg.raw.additionalData.payload.Url,'_blank');
          

      //   } else {
      //     console.log('You are not sure');
      //   }
      // });
  });
    
    $http.get("assets/i18n/"+language+".json")
            .success(function (data) {
                i18core=data;
                i18translate();
                // App translations
                i18forms(function(){
                    $("#input_query").focus();
                });
    });
    $(document).keypress(function(e) {
        
        if(e.which == 13) {
            if (searchquery.length<=3) {
                $state.go('notFound');
            } else {
                if (userid>0){
                    console.log("searching via enter");
                    $state.go('searchig');
                    SearchFunction($scope,$state,$rootScope);
                }
            }
        }
    });
    var deviceInformation = ionic.Platform.device();
    $scope.$watch('input_query',function (oldValue, newValue) {
        //alert('changed')
    });
    $scope.$watch('search_btn',function(onclick){
        console.log("searchbutton being watch");
    });
    
    $scope.onSearchDo = function () {
        if (searchquery.length<=3) {
            $state.go('notFound');
        } else {
            console.log("searching via button");
            $state.go('searchig');
            SearchFunction($scope,$state,$rootScope);
        }
    }
    $scope.$watch('contact_btn',function(onclick){
        console.log("contact being watch");
        
    });
    $scope.onContactDo = function () {
        $state.go('contact');
    } 
    $scope.onSearchChange = function () {
        //alert('change value')
        idleTime=0;
        jsonresults = [];
        searchquery = $("#input_query").val();
        console.log(searchquery);
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
    }
    
})
.controller('resultsCtrl', function($scope,$state,$rootScope) {
    i18forms(function(){
        
    });
    var oldSoftBack = $rootScope.$ionicGoBack;
    $rootScope.$ionicGoBack = function() {
        $state.go("page");
    };
})
.controller('detailsCtrl', function($scope,$state,$rootScope) {
    i18forms(function(){
        console.log("Details translated.");
        var oldSoftBack = $rootScope.$ionicGoBack;
        $rootScope.$ionicGoBack = function() {
            if (jsonresults.length>0) {
                $state.go("results");
            } else {
                $state.go("page");
            }
        };
    });  
}) 
.controller('eNATTENTEDECHARGEMENTCtrl', function($scope) {
    i18forms(function(){
        console.log("translation end");     
    });
})
   
.controller('searchigCtrl', function($scope, $state, $rootScope) {
    
        i18forms(function(){
            searchingloaded=true;   
        });
    
})
.controller('notFoundCtrl', function($scope) {
    i18forms(function(){
        console.log("translation end");     
    });
})
.controller('contactCtrl', function($scope, $state) {
    i18forms(function(){
        console.log("translation end"); 
        $('#isomap').animateCss('flip');    
    });
})
.controller('registrationCtrl', function($scope,$state) {
    i18forms(function(){
        console.log("translation end"); 
        $scope.$watch('onReg1',function(onclick){
        console.log("onReg1 being watch");
        
        });
        $scope.onReg1 = function () {
            $state.go('registration1');
        }     
    });
})
.controller('registrationOneCtrl', function($scope,$state) {
    i18forms(function(){
        console.log("translation reg 1 end");     
    });
})
.controller('registrationTwoCtrl', function($scope,$state,$rootScope) {
    i18forms(function(){
        console.log("translation reg 2 end");
        $scope.onTelChange = function () {
            //alert('change value')
            idleTime=0;
            jsonresults = [];
            mobile_number = "00" + $("#countrycode").val() + $("#mobile_number").val();
            
            console.log(mobile_number+ " lenght "+mobile_number.toString().length);
        } 
    });
})
.controller('registration3Ctrl', function($scope,$state) {
    i18forms(function(){
        console.log("translation reg 3 end");
        $scope.onsmscodeChange = function () {
            smscode = $("#sms_code").val();
        }
        if (mobile_number.toString().length<9) {
            $state.go("regerror1");
        } 
    });
})
.controller('registration4Ctrl', function($scope,$state,$ionicPlatform) {
    $ionicPlatform.registerBackButtonAction(function(e) {
        //do your stuff
        e.preventDefault();
    }, 101);
    i18forms(function(){
        console.log("translation reg 4 end");
        
    });
})
.controller('registration5Ctrl', function($scope,$state) {
    i18forms(function(){
        console.log("translation reg 5 end");
             
    });
})
.controller('registration6Ctrl', function($scope,$state) {
    i18forms(function(){
        console.log("translation reg 6 end"); 
        $scope.onNameChange = function () {
            full_name = $("#full_name").val();
            
        }
        $scope.$watch('onReg6',function(onclick){}); 
        $scope.onReg6 = function () {
            console.log("Full name:"+full_name);
            if (full_name.length>1) {
                $state.go("registration7");
            } else {
                alert(i18core.labelErrReg3);
            }
        } 
    });
})
.controller('registration7Ctrl', function($scope,$state) {
    i18forms(function(){
        console.log("translation reg 7 end");    
        $scope.onEmailChange = function () {
            email = $("#email").val();
        }
        $scope.$watch('onReg7',function(onclick){ }); 
        $scope.onReg7 = function () {
            if (ValidateEmail(email)===true) {
                $state.go("registration8");
            } else {
                alert(i18core.labelErrReg2);
            }
        }
    });
})
.controller('registration8Ctrl', function($scope,$state) {
    i18forms(function(){
        console.log("translation reg 8 end");  
        $scope.onConfirm1 = function () {
            $state.go("page");
            location.reload();
        }     
    });
})
.controller('regerror1Ctrl', function($scope,$state) {
    i18forms(function(){
        console.log("translation reg err 1 end");     
    });
})