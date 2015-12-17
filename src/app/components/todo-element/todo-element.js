'use strict';
import {Component, Input, ElementRef} from 'angular2/core';
import {app, adapter} from './../../ng-decorators';

@Component({
    selector: 'todo-element',
    templateUrl: 'app/components/todo-element/todo-element.html',
    inputs: ['item']
})
export class TodoElement {}

app.directive('todoElement',
    adapter.downgradeNg2Component(TodoElement));