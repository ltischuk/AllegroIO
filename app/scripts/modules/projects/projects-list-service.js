/**
 * Created by ltischuk on 10/11/14.
 */
'use strict';

/**
 * @ngdoc function
 * @name allegroIoApp.service:ProjectListSvc
 * @description
 * Service of the allegroIoApp
 */
angular.module('allegroIoApp')
    .service('ProjectListService', function ProjectList(Project) {

        this.projectList = [new Project('ngcropdemo')];

    }
);
