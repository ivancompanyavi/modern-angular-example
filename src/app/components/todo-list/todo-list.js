'use strict';

import {View, Component} from '../../ng-decorators';
import template from './todo-list.html!text';

@Component({
    selector: 'todo-list'
})
@View({
    template: template
})
class TodoList {
    constructor() {
        this.todoList = [
            {message: "This is a meesage", date: new Date()},
            {message: "Buy some food for Christmas", date: new Date()},
            {message: "long text long text long text long text long text long text long text long text long text long text long text long text long text long text ", date: new Date()}
        ];
    }
}