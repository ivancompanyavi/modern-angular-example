'use strict';

import angular from 'angular';

import './components/components';
import app from './ng-decorators';

angular.element(document).ready(function() {
    angular.bootstrap(document, [app.name], {
    	strictDi: true
    });
});