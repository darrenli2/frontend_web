jest.unmock('../app/components/Header');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Header from '../app/components/Header'

describe('<Header /> (not authenticated )', () => {
  it('displays "Home", "Sign Up" and "Sign In" links', () => {
    const app = TestUtils.renderIntoDocument(
      <Header />
    );
    const appNode = ReactDOM.findDOMNode(app);
    expect(appNode.textContent).toContain('Home');
    expect(appNode.textContent).toContain('Sign Up');
    expect(appNode.textContent).toContain('Sign In');
  });
});

describe('<Header /> ( authenticated)', () => {
  it('displays "Home" and "Sign Out" links', () => {
    const app = TestUtils.renderIntoDocument(
      <Header authenticated={true} />
    );
    const appNode = ReactDOM.findDOMNode(app);
    expect(appNode.textContent).toContain('Home');
    expect(appNode.textContent).toContain('Sign Out');
  });
});
