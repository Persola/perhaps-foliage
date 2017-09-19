import React from 'react';
import { shallow } from 'enzyme';
import CodeStage from '../../../../src/renderer/components/code-stage.jsx';

const syntaticGraph = require("../../../data_mocks/syntactic-graph.yml");

describe ('codeLoader', () => {
  describe ('with normal props', () => {
    const stageful = syntaticGraph;

    it ('renders', () => {
      expect(shallow(
        <CodeStage stageful={stageful} />
      )).toMatchSnapshot();
    });
  });

  describe ('when the stageful is false', () => {
    const stageful = false;

    it ('renders', () => {
      expect(shallow(
        <CodeStage stageful={stageful} />
      )).toMatchSnapshot();
    });
  });
});
