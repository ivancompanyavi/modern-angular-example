'use strict';

import angular from 'angular';
import 'reflect-metadata';

import './components/components';
import {app, adapter} from './ng-decorators';

angular.element(document).ready(function() {

    adapter.bootstrap(document.body, [app.name]);
});