/*
Translate.js
Author: RGW IT SERVICES SPRL, ANDROID DEV STAFF
Description:
Functions and vars with the sole intend of translating the UI and keep constant variables in the computer RAM
Instead of sending back and forward data from the servver that will result in slow and not fluent 
interface for the end user, and in a more expensive fee for the server provider and by consequent to the 
final software customer.
*/
console.log(navigator.language.split('-')[0]);
var language=navigator.language.split('-')[0];
var w = window.innerWidth;
var h = window.innerHeight;
var i18=[];
var i18c=[];
var i18a=[];
var i18app="";
var i18core="";
var idleTime = 0;
var searchquery="";
/* Test and Development vars default values */
var serverurl = "https://socartest.rgwit.be/mobile/";
/* Operational Phase vars defailt values */
// var serverurl = "https://mobileapp.socar.be/mobile/";
var jsonresults = [];
var selected_result = 0;
var htmlOriginal = $.fn.html;
var htmlOriginal = $.fn.html;
var listhead='<ion-list id="results-items" class=" "><div class="list">';
var itemhead1="\r\n"+'<ion-item class="item-thumbnail-left positive item" id="resultsRSultats-list-item_';
var itemhead2='"><img src="img/flag_';
var itembody1='.svg"><h2positive><strong><span class="">';
var itembody2='</span></strong><p style="white-space:normal;">BL <strong>';
var itembody3='</strong><p>';
var itembody4='</p></h2positive></ion-item>';
var itemfoot='';
var listfoot='</div></ion-list>';
var devicePosition="Portrait";
var searchingloaded=false;
var dataLoaded=false;
var deviceInformation = ionic.Platform.device();
var isIOS = ionic.Platform.isIOS();
var isAndroid = ionic.Platform.isAndroid();
var isWebView = ionic.Platform.isWebView();
var userid=0;
var full_name="";
var mobile_number="";
var smscode="";
var email="";
var appver="2.0.3";
//var uuid=window.device.uuid;
var uuid="F17A2D767A003FB1";
// redefine the `.html()` function to accept a callback
$.fn.html = function(html,callback){
  // run the old `.html()` function with the first parameter
  var ret = htmlOriginal.apply(this, arguments);
  // run the callback (if it is defined)
  if(typeof callback == "function"){
    callback();
  }
  // make sure chaining is not broken
  return ret;
}
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    
}
function i18translate(callback) {       
        
        // core translations    
}
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        $(this).addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
function ValidateEmail(mail){  
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))  
  {  
    return (true)  
  }
    return (false)  
}  
function onClickItem(callback){
    console.log("CLICK ITEM!");
    $("[id^=resultsRSultats-list-item_]").click(function(){
        var itemidarr=this.id.split("_");
        var itemid=itemidarr[1];
        if (itemid!=null) {
            selected_result=itemid;
            //$("#resultsRSultats-list-item_"+itemid).css("background-color","#FFEB3B");
            $("#resultsRSultats-list-item_"+itemid).animateCss('animated rubberBand');
            console.log("item "+itemid+" click from function onClickItem");
            //displayDetails(itemid);
            if(callback) callback(); 
        }
    });
}
function SearchFunction($scope,$state,$rootScope){
    $state.go("searchig");
    $rootScope.$on('$stateChangeSuccess', 
        function(event, toState, toParams, fromState, fromParams){ 
            console.log("SearchFunction state loaded: "+toState.name);
            if (toState.name=="notFound") {
                dataLoaded=false;
            }
            if (toState.name=="page") {
                location.reload();
            }
            if (toState.name=="searchig") {
                console.log("searchig in work dataloaded : " + dataLoaded);
                if (fromState.name=="page" && dataLoaded===false) {
                    dataLoaded=true;
                    console.log("coming from page at second ");
                    $state.go($state.current, {}, {reload: true});
                    if (userid>0) {
                        getData({q:searchquery},function (ans) {
                            if (ans.errcode>0) {
                                $state.go('notFound');
                            } else {
                                dataLoaded=true;
                                var total_results=ans.length;
                                console.log("SearchFunction Total results: " + total_results);
                                if (devicePosition=="Landscape") {
                                    console.log("Landscape showing multiview state");
                                    $state.go('multiple-views');
                                } else {
                                    console.log("Portrait showing results state");
                                    $state.go('results');
                                }
                            }
                        });
                    } else {
                        checkUUID(uuid, function(id){
                            if (id>0) {
                                getData({q:searchquery},function (ans) {
                                    if (ans.errcode>0) {
                                        $state.go('notFound');
                                    } else {
                                        dataLoaded=true;
                                        var total_results=ans.length;
                                        console.log("SearchFunction Total results: " + total_results);
                                        if (devicePosition=="Landscape") {
                                            console.log("Landscape showing multiview state");
                                            $state.go('multiple-views');
                                        } else {
                                            console.log("Portrait showing results state");
                                            $state.go('results');
                                        }
                                    }
                                });
                            } else {
                                // Registration
                                console.log("Registration need it");
                                $state.go("registration");
                            }
                        });
                        
                    }
                }  else {
                    console.log("Search cancel it does not complain to conditions ");
                    
                }
            }
            if (toState.name=="results") {
                if (fromState.name=="page") {
                    dataLoaded=true;
                    $state.go($state.current, {}, {reload: true});
                }
                displayResults(function () {
                    console.log("Results on stage");
                    onClickItem(function (callback) {
                        dataLoaded=true;
                        $state.go('details');
                    });
                });
                $rootScope.$ionicGoBack = function() {
                    //$state.go("page");
                    $state.transitionTo('page', null, {'reload':true});
                };
            }
            if (toState.name=="details") {
                displayDetails(selected_result);
            }
            if (toState.name=="page") {
                console.log("page state");
                if (fromState.name=="results") {
                    dataLoaded=false;
                    $state.go($state.current, {}, {reload: true});
                    console.log("coming from results");
                }
            }
            
            if (toState.name=="multiple-views") {
                i18forms(function(){
                    console.log("multiple-views translated");
                    displayResults(function () {
                        console.log("Results on multiview");
                        onClickItem(function (callback) {
                            $("#detailslogo").css("display","none");
                            $("#detailsdata").css("display","block");
                            displayDetails(selected_result);
                        });
                    });
                });
            }
            
            if (toState.name=="registration3") {
                $("#mobile_phone").text(mobile_number);
                if (mobile_number.toString().length<9) {
                    $state.go("regerror1");
                } else {
                    
                    newuser(uuid,language,mobile_number,function() {
                        console.log("New user registered ");
                        
                    });
                }
            }
            if (toState.name=="regerror1") {
                $("#mobile_phone").text(mobile_number);
            }
            if (toState.name=="registration4") {
                $("#mobile_phone").text(mobile_number);
                if (userid==0) {
                    alert(i18core.servererr1);
                    $state.go("registration3");
                } else {
                    console.log("Veryfing code "+smscode);
                    regcode(uuid,smscode,function(coderesult) {
                        if (coderesult==1) {
                            $state.go("registration5");
                        } else {
                            // todo error incorrect code try again.
                        }
                    });
                }
            }
            if (toState.name=="registration5") {
            
            }
            if (toState.name=="registration6") {
                
            }
            if (toState.name=="registration7") {
            
            }
        }
    );
}
function i18forms(callback){
    i18c=i18core;
    if (i18c) {
        $.each(i18c, function(key, value) {
            $("#"+key).text(value);
            if (key.indexOf("input_")>-1){
                $("#"+key).attr("placeholder",value);
            }
        });
        callback();
    } else {
        console.log("Translation form empty");
        callback();
    }
}
function displayResults(callback){
    console.log("Displaying Results..");
    var htmlcontent=listhead;
    for (var i = jsonresults.length - 1; i >= 0; i--) {
        var status = jsonresults[i].status_desc.replace(" ","");
        status=status.replace(" ","");
        var pod=jsonresults[i].pod_desc.replace(" ","");
        pod = pod.replace(" ","");
        htmlcontent=htmlcontent+(itemhead1+i+itemhead2+pod+itembody1+jsonresults[i].consignee_desc+itembody2+jsonresults[i].bl_number+itembody3+jsonresults[i].desc+'<br>Chassis:<br><strong>'+jsonresults[i].vin+'</strong><br>'+jsonresults[i].pod_desc+"<br>"+itembody4+itemfoot);
    }
    htmlcontent=htmlcontent+listfoot;
    //console.log("html list:"+htmlcontent);
    $("#results-list").html(htmlcontent,function(){
        console.log("html loaded");
        if(callback) callback();
    });
}
function cleanDetails(callback){
    
    if ($("#consignee").text()=="") {
        console.log("Nothing to clean");
        callback();
    } else {
        console.log("Cleaning last details");
        $("#consignee").text("");
        $("#bl").text("");
        $("#status_desc").text("");
        $("#vessel_label").text("");
        $("#goods_desc").text("");
        $("#pod").text("");
        $("#vin").text("");
        $("#vessel_desc").text("");
        $("#departure_date").text("");
        $("#agent").text("");
        $("#agent_phone").text("");
        $("#clicktocall").attr("href","");
        callback();
    }
}
function displayDetails(selected_result) {
    if (jsonresults.length>0){
        cleanDetails(function (callback) {
            console.log("Confirm displaying details of array, selected key:"+selected_result);
            var pod=jsonresults[selected_result].pod_desc.replace(" ","");
            pod = pod.replace(" ","");
            console.log("Consignee "+jsonresults[selected_result].consignee_desc);
            console.log("Status"+jsonresults[selected_result].status_desc);
            $("#consignee").text(jsonresults[selected_result].consignee_desc);
            $("#bl").text(jsonresults[selected_result].bl_number);
            if (jsonresults[selected_result].status_desc=="DEPARTED") {
                $("#details-agent").css("display","block");
                $("#clicktocall").css("display","block");
                $("#status_desc").text(i18core.labelloaded);
                $("#vessel_label").text(i18core.labelvessel);
            }
            if (jsonresults[selected_result].status_desc=="BOOKED" || jsonresults[selected_result].status_desc=="") {
                $("#details-agent").css("display","none");
                $("#clicktocall").css("display","none");
                $("#bllabel").text("");
                $("#status_desc").text(i18core.labelbooked);
                $("#vessel_label").text(i18core.labelprevessel);
            }
            if (jsonresults[selected_result].status_desc=="PORT OF LOADING") {
                $("#details-agent").css("display","none");
                $("#clicktocall").css("display","none");
                $("#bllabel").text("");
                $("#status_desc").text(i18core.labelonport);
                $("#vessel_label").text(i18core.labelprevessel);
            }
            $("#podflag").attr("src","img/flag_"+pod+".svg");
            $("#goods_desc").text(jsonresults[selected_result].desc);
            $("#pod").text(jsonresults[selected_result].pod_desc);
            $("#vin").text(jsonresults[selected_result].vin);
            $("#booking_id").text("Ref Socar : " + jsonresults[selected_result].booking_id);
            $("#vessel_desc").text(jsonresults[selected_result].vessel_desc);
            $("#departure_date").text(jsonresults[selected_result].departure_date);
            $("#arrival_date").text(jsonresults[selected_result].eta);
            $("#agent").text(jsonresults[selected_result].agent);
            $("#agent_phone").text(jsonresults[selected_result].agent_phone);
            $("#clicktocall").attr("href","tel:"+jsonresults[selected_result].agent_phone); 
            $("#sharebtn").click(function(){ 
                console.log("Share button");
                performAlternateShareMethod("https://www.ruvenss.com");
            });
        });
    } else {
        console.log("nothing to display, selected_result IS NULL");
    }
}
function performAlternateShareMethod(link) {
  // You'll need to create a facebook app and replace APPID with it. No Facebook review is required. We just need an ID here.
  // Also you can share links only with this method. In any case I believe that you can create pages for this feature. This pages can also
  // contain some app promotional info
  var url = 'https://m.facebook.com/sharer.php?u=' + encodeURIComponent(link) + '&app_id=APPID&referrer=social_plugin',
      inappBr = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
  inappBr.addEventListener('loadstart', function (e) { //wait for loading
    if (e.url.indexOf(link) == 0) {
      alert('posting was cancelled');
      inappBr.close();
    }
    if (e.url.indexOf('https://m.facebook.com/story.php') == 0) {
      inappBr.close();
      alert('You posted this on Facebook');
    }
  });
}
function checkUUID(uuid,callback) {
    getData({f:"checkUUID",uuid:uuid},function (ans) {
        if (typeof ans.errcode !== 'undefined') {
            if (ans.errcode==5) {
                
                callback(0);
            }
        } else {
            userid=ans[0].id;
            full_name=ans[0].full_name;
            callback(ans[0].id);
        }
    }); 
}
function regcode(uuid,smscode,callback) {
    getData({f:"checkcode",uuid:uuid,smscode:smscode},function (ans) {
        if (typeof ans.errcode !== 'undefined') {
            if (ans.errcode==5) {
                callback(0);
            }
        } else {
            callback(1);
        }
    }); 
}
function newuser(uuid,user_lang,mobile_number,callback) {
    console.log("Registering new user... ");
    if (userid==0) {
        getData({f:"newuser",uuid:uuid,user_lang:user_lang,mobile_number:mobile_number,appver:appver},function (ans) {
            userid=ans.ans;
            console.log("New user registration successful under id "+userid);
            callback();
        }); 
    } else {
        console.log("Registration failed");
        callback();
    }
}
function getData(options,callback) {
	if (options) {
        if (serverurl.length>0) {
            $.post(serverurl, options, function(result,status){
                if (status=="success") {
                    console.log("status success");
                    if (result.length>0) {
                        //console.log("result: "+result);
                        var ans=JSON.parse(result);
                        if (typeof ans.errcode !== 'undefined') {
                            if (ans.errcode>0) {
                                //$("#alertmsg").text(ans.errmsg);
                                //Custombox.open({target: '#modal',effect:'blur'});
                                callback(ans);
                            }
                        } else {
                            jsonresults=ans;
                            callback(ans);
                        }
                    } else {
                        console.log("Result empty");
                        var ans=[0];
                        callback(ans);
                    }
                } else {
                    console.log("status error");
                }
            });
        } else {
            console.log("server missing");
        }
	} else {
		console.log("options incorrect");
	}
}
function searchfunction() {
    console.log("Search function");
    searchquery=$("#searchquery").val();
    if (searchquery.length>3) {
         window.location.href = '/#/searching';
         getData({q:searchquery}, function (ans) {
            if (ans.ans=="0") {
                window.location.href = '/#/notfound';
            } else {
                $("#searchquery").val("");
                window.location.href = '/#/page3';
            }
         });
    } else {
        alert("TYPE/TAPEZ : CHASSIS, BL, or  CONSIGNEE");
        $("#searchquery").focus();
    }
}
function tabletUI() {
    console.log("Detecting Tablet");
    console.log("resize detected "+ w +"x" + h);
    if (w > 900) {
        devicePosition = "Landscape";
        console.log("Tablet Landscape position, Adapt UI for Widescreens");
        $("#logo_image").css("height","500");
        $("#logo_image").css("width","auto");
    } else {
        devicePosition = "Portrait";
        console.log("Tablet Portrait position, Adapt UI for Portrait");
        $("#logo_image").css("height","auto");
        $("#logo_image").css("width","100%");
    }
}
$(window).resize(function($state) {
    w = window.innerWidth;
    h = window.innerHeight;
    if (w>900 || h>900) {
        tabletUI();
    }
});
function orientationUI() {
    if (w>900 || h>900) {
        var unlockOrientation = screen.unlockOrientation || screen.mozUnlockOrientation || screen.msUnlockOrientation || (screen.orientation && screen.orientation.unlock);
        tabletUI();
        
    }
}
