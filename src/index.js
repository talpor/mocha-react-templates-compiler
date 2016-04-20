import fs from 'fs';
import reactTemplates from 'react-templates/src/reactTemplates';

const babel = require('babel-core');
const orig = require.extensions['.js'];

export const loaderCreator = opts => (module, filename) => {
  if (filename.indexOf('node_modules') >= 0)
    return orig(module, filename);

  const content = fs.readFileSync(filename, 'utf-8');
  const template = reactTemplates.convertTemplateToReact(content, opts);
  const code = babel.transform(template, {
    presets: ['es2015'],
    ast: false
  }).code;

  return module._compile(code, filename);
};

export default opts => {
  const loader = loaderCreator(opts);
  ['.rt'].forEach(ext => {
    require.extensions[ext] = loader;
  });
};
