'use strict';

import angular from 'angular';


const app = angular.module('TodoApp', [])

function Component(component) {
    return function decorator(target) {
        component = component ? component : {};
        if (!component.selector) {
            throw new Error('@Component() must contains selector property!');
        }

        if (target.$initView) {
            target.$initView(component.selector);
        }

        target.$isComponent = true;
    };
}

function View(view) {
    let options = view ? view : {};
    const defaults = {
        template: options.template,
        restrict: 'E',
        scope: {},
        bindToController: true,
        controllerAs: 'vm'
    };
    return function decorator(target) {
        if (target.$isComponent) {
            throw new Error('@View() must be placed after @Component()!');
        }

        target.$initView = function(directiveName) {
            directiveName = pascalCaseToCamelCase(directiveName);
            directiveName = dashCaseToCamelCase(directiveName);

            options.bindToController = options.bindToController || options.bind || {};

            app.directive(directiveName, function () {
                return Object.assign(defaults, { controller: target }, options);
            });
        };

        target.$isView = true;
    };
}

function Directive(options) {
    return function decorator(target) {
        const directiveName = dashCaseToCamelCase(options.selector);
        app.directive(directiveName, target.directiveFactory);
    };
}

// Utils functions
function pascalCaseToCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.substring(1);
}

function dashCaseToCamelCase(string) {
    return string.replace( /-([a-z])/ig, function( all, letter ) {
        return letter.toUpperCase();
    });
}

export default app;
export {Component, View, Directive};