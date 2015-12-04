'use strict';

import angular from 'angular';
import moduleName from './app';

angular.element(document).ready(function() {
    angular.bootstrap(document, [moduleName], {
    	strictDi: true
    });
});