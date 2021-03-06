/**
 * Created by ltischuk on 10/11/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name allegroIoApp.factory:NavigationSrv
 * @description
 * # EnumsSvc
 * Service of the allegroIoApp
 */
angular.module('allegroIoApp')
    .factory('NavigationService', function NavigationService () {
        var service = {};
        service.mainAppName = 'AllegroIO';
        service.menuItems = [{name: 'Home', stateName:'home' },
                             {name: 'Projects', stateName: 'projects.selection'},
                             {name: 'About Me', stateName:'about'}];

        return service;
    }
);
