import {app} from './../../ng-decorators';
app
    .directive('todoBox', todoBox)
    .controller('TodoBoxController', TodoBoxController);

function todoBox() {
    return {
        restrict: 'E',
        templateUrl: 'app/components/todo-box/todo-box.html',
        controller: 'TodoBoxController',
        controllerAs: 'ctrl'
    }
}

function TodoBoxController() {
    var vm = this;
    vm.addTodo = addTodo;

    initialize();

    function initialize() {
        vm.showNewTodo = false;
        vm.newTodo = {};
    }

    function addTodo() {
        vm.showNewTodo = true;
        vm.newTodo = {};
    }
}