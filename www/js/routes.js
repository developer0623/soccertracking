angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  .state('page', {
    url: '/page1',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

  .state('results', {
    url: '/page2',
    templateUrl: 'templates/results.html',
    controller: 'resultsCtrl'
  })

  .state('details', {
    url: '/page3',
    templateUrl: 'templates/details.html',
    controller: 'detailsCtrl'
  })

  .state('eNATTENTEDECHARGEMENT', {
    url: '/page6',
    templateUrl: 'templates/eNATTENTEDECHARGEMENT.html',
    controller: 'eNATTENTEDECHARGEMENTCtrl'
  })

  .state('searchig', {
    url: '/page4',
    templateUrl: 'templates/searchig.html',
    controller: 'searchigCtrl'
  })
  .state('notFound', {
    url: '/notFound',
    templateUrl: 'templates/page7.html',
    controller: 'notFoundCtrl'
  })
  .state('multiple-views',{
      name : 'multiple-views',
      url: "/tablet",
      templateUrl: "templates/multiview.html",
      controller: 'resultsCtrl'
    })
    .state('contact',{
      name : 'contact',
      url: "/contact",
      templateUrl: "templates/contact.html",
      controller: 'contactCtrl'
    })
    .state('registration',{
      name : 'registration',
      url: "/registration",
      templateUrl: "templates/registration.html",
      controller: 'registrationCtrl'
    })
    .state('registration1',{
      name : 'registration1',
      url: "/registration1",
      templateUrl: "templates/registration1.html",
      controller: 'registrationOneCtrl'
    })
    .state('registration2',{
      name : 'registration2',
      url: "/registration2",
      templateUrl: "templates/registration2.html",
      controller: 'registrationTwoCtrl'
    })
    .state('registration3',{
      name : 'registration3',
      url: "/registration3",
      templateUrl: "templates/registration3.html",
      controller: 'registration3Ctrl'
    })
    .state('registration4',{
      name : 'registration4',
      url: "/registration4",
      templateUrl: "templates/registration4.html",
      controller: 'registration4Ctrl'
    })
    .state('registration5',{
      name : 'registration5',
      url: "/registration5",
      templateUrl: "templates/registration5.html",
      controller: 'registration5Ctrl'
    })
    .state('registration6',{
      name : 'registration6',
      url: "/registration6",
      templateUrl: "templates/registration6.html",
      controller: 'registration6Ctrl'
    })
    .state('registration7',{
      name : 'registration7',
      url: "/registration7",
      templateUrl: "templates/registration7.html",
      controller: 'registration7Ctrl'
    })
    .state('registration8',{
      name : 'registration8',
      url: "/registration8",
      templateUrl: "templates/registration8.html",
      controller: 'registration8Ctrl'
    })
    .state('regerror1',{
      name : 'regerror1',
      url: "/regerror1",
      templateUrl: "templates/regerror1.html",
      controller: 'regerror1Ctrl'
    })
$urlRouterProvider.otherwise('/page1')

  

});
