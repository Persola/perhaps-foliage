import React from 'react';
import { shallow } from 'enzyme';
import {
  Editor,
  mapStateToProps,
  mapDispatchToProps
} from '../../../../src/renderer/components/editor.jsx';

describe ('Editor', () => {
  it ('renders', () => {
    expect(shallow(
      <Editor />
    )).toMatchSnapshot();
  });
})

describe ('mapStateToProps', () => {
  it ('returns the state', () => {
    const state = { stageful: 72 }

    expect(mapStateToProps(state)).toEqual(state);
  });
})

describe ('mapDispatchToProps', () => {
  it ('returns an empty object', () => {
    expect(mapDispatchToProps()).toEqual({});
  });
})
