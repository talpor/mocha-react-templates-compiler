'use strict';

var reactTemplates = require('react-templates/src/reactTemplates');
var fs = require('fs');
var orig = require.extensions['.js'];
var exts = ['.rt'];

var loader = function(ext, module, filename) {
    if (filename.indexOf('node_modules') >= 0) {
      return orig(module, filename);
    }
    var content = fs.readFileSync(filename, 'utf-8');
    var template = reactTemplates.convertTemplateToReact(content, {modules: 'commonjs'});

    module._compile(template, filename);
};

exts.forEach(function(ext) {
    require.extensions[ext] = loader.bind(undefined, ext); 
});
