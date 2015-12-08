/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import gulp from 'gulp';
import util from 'gulp-util';
import inject from 'gulp-inject';
import httpProxy from 'http-proxy';
import modRewrite  from 'connect-modrewrite';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import path from '../paths';
import {API_URL} from '../const';

const argv = util.env;
const LOG = util.log;
const COLORS = util.colors;
const TEST_OPTIMIZE = 'test-optimize';

//=============================================
//         COMMAND LINE ERROR HANDLING
//=============================================

let ENV = !!argv.env ? argv.env.toLowerCase() : 'dev';
let OPTIMIZE = !!argv.optimize ? argv.optimize.toLowerCase() : 'false';
let OPEN_BROWSER = !!argv.open ? argv.open.toLowerCase() : 'true';

if(!OPEN_BROWSER.match(new RegExp(/true|false/))) {
    LOG(COLORS.red(`Error: The argument 'open' has incorrect value ${OPEN_BROWSER}! Usage: --open=(true|false)`));
    process.exit(1);
} else {
    OPEN_BROWSER = OPEN_BROWSER === 'true';
}

if(!OPTIMIZE.match(new RegExp(/true|false/))) {
    LOG(COLORS.red(`Error: The argument 'optimize' has incorrect value ${OPEN_BROWSER}! Usage: --optimize=(true|false)`));
    process.exit(1);
} else if(OPTIMIZE === 'true') {
    ENV = TEST_OPTIMIZE;
}

if(!ENV.match(new RegExp(/prod|dev|test/))) {
    LOG(COLORS.red(`Error: The argument 'env' has incorrect value ${ENV}! Usage: --env=(dev|test|prod)`));
    process.exit(1);
}

//=============================================
//           PROXY CONFIGURATION
//=============================================

// This configuration allow you to configure browser sync to proxy your backend
const proxyTarget = API_URL; // The location of your backend API
const proxyApiPrefix = 'api/'; // The element in the URL which differentiate between API request and static file request

let proxy = httpProxy.createProxyServer({
    target: proxyTarget
});

function proxyMiddleware(req, res, next) {
    if (req.url.includes(proxyApiPrefix)) {
        proxy.web(req, res, (err) => {
            // if there is any proxy error return the error
            next(err);
        });
    } else {
        next();
    }
}

function startBrowserSync(baseDir, files, browser) {
    browser = browser === undefined ? 'default' : browser;
    files = files === undefined ? 'default' : files;

    browserSync({
        files: files,
        open: OPEN_BROWSER,
        port: 8000,
        notify: false,
        server: {
            baseDir: baseDir,
            middleware: [
                proxyMiddleware,
                modRewrite(['!\\.\\w+$ /index.html [L]']) // require for HTML5 mode
            ]
        },
        browser: browser
    });
}


//=============================================
//                 TASKS
//=============================================

/**
 * The 'startBrowserSync' task start BrowserSync and open the browser.
 */
gulp.task('startBrowserSync', () => {
    return startBrowserSync(['.tmp', 'src', 'jspm_packages', './' ]);
});

/**
 * The 'serve' task serve the dev, test and prod environment.
 */
gulp.task('serve', () => {

    // this will first run all serveTasks and then startBrowserSync task
    runSequence(
        ['sass', 'watch'],
        ['startBrowserSync']
    );
});