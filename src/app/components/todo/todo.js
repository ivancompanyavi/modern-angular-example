'use strict';

import {View, Component} from '../../ng-decorators';

@Component({
	selector: 'todo'
})
@View({
	template: `
		<h1>This is my first component</h1>
	`
})
class Todo {}
