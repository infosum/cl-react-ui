console.log('set up mocha ......');

const { JSDOM } = require('jsdom');
// Have to set a url to avoid security
// errors with browserHistory.push('/');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://localhost:3004' });
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
copyProps(window, global);


// Mock FormData
global.FormData = function () {
  if (!(this instanceof FormData)) {
    return new FormData();
  }
};

// Mock FormData to enable testing of uploads
global.FormData.prototype.append = function (key, value, options) {
  options = options || {};
  this[key] = value;
};

global.navigator = {
  userAgent: 'node.js'
};
