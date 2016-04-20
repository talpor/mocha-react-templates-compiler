/* global describe, it */

import chai from 'chai';
import fs from 'fs';
import reactTemplates from 'react-templates/src/reactTemplates';
import sinon from 'sinon';

import register, { loaderCreator } from '../dist';

const babel = require('babel-core');
const expect = chai.expect;

describe('register', () => {
  it('registers `.rt` extension', () => {
    register({});
    expect(require.extensions).to.have.any.keys('.rt');
  });
});


describe('loaderCreator', () => {
  it('returns a loader that works', () => {
    const expectedContent = 'rt file content';
    const expectedRtCode = 'rt transformation of rt content';
    const expectedCode = 'final code';

    sinon.stub(fs, 'readFileSync');
    sinon.stub(reactTemplates, 'convertTemplateToReact');
    sinon.stub(babel, 'transform');

    fs.readFileSync.returns(expectedContent);
    reactTemplates.convertTemplateToReact.returns(expectedRtCode);
    babel.transform.returns({ code: expectedCode });

    module._compile = sinon.spy();

    const filename = 'some-template-file.rt';
    const opts = { modules: 'es6' };
    const loader = loaderCreator(opts);

    loader(module, filename);

    expect(fs.readFileSync.calledWith(filename)).to.equal(true);
    expect(reactTemplates.convertTemplateToReact.calledWithExactly(expectedContent, opts)).to.equal(true);  // eslint-disable-line max-len
    expect(babel.transform.calledWith(expectedRtCode)).to.equal(true);
    expect(module._compile.calledWithExactly(expectedCode, filename));
  });
});
