'use strict';

import path from 'path';

const root = path.dirname(__dirname);
const paths = {
	root: root,
	syles: `${root}/styles/`,
	gulpfile: [`${root}/gulpfile.js`, `${root}/gulp/**/*.js`],
	app: {
		styles: `${root}/src/styles/**/*.scss`,
		images: `${root}/src/images/**/*.{png,gif,jpg,jpeg}`,
		scripts: [`${root}/src/app/**/*.js`],
		fonts: [`${root}/src/fonts/**/*.{eot,svg,ttf,woff,woff2}`, `${root}/jspm_packages/**/*.{eot,svg,ttf,woff,woff2}`],
		html: `${root}/src/index.html`,
		templates: `${root}/src/app/**/*.html`,
	},
	tmp: {
		styles: `${root}/.tmp/styles/`
	}
};

export default paths;