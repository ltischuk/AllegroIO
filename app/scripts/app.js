'use strict';

/**
 * @ngdoc overview
 * @name allegroIoApp
 * @description
 * # allegroIoApp
 *
 * Main module of the application.
 */
angular
  .module('allegroIoApp',
    ['ui.router']

    )
  .config(function ($locationProvider, $stateProvider, $urlRouterProvider) {


        $locationProvider.html5Mode(true);

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: '/views/main.html',
                controller: 'MainCtrl'
            });

        $urlRouterProvider.otherwise('/home');
    });