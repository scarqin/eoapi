"use strict";
// This file is required by karma.conf.js and loads recursively all the .spec and framework files
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/testing");
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
// First, initialize the Angular testing environment.
(0, testing_1.getTestBed)().initTestEnvironment(testing_2.BrowserDynamicTestingModule, (0, testing_2.platformBrowserDynamicTesting)(), {
    teardown: { destroyAfterEach: false }
});
// Then we find all the tests.
var context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
//# sourceMappingURL=test.js.map