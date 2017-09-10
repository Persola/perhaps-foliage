import React from 'react';
import { shallow } from 'enzyme';
import {
  CodeStage,
  mapStateToProps,
  mapDispatchToProps
} from '../../../src/renderer/components/code-stage.jsx';

describe ('CodeStage', () => {
  it ('renders', () => {
    expect(shallow(
      <CodeStage />
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
