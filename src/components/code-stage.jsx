// @flow
import React from 'react';
import { connect } from 'react-redux';

import SyntacticalNode from './syntactical-node.jsx';

const codeStage = () => {
  const { code } = this.props;

  return (
    <SyntacticalNode
      serialization={code}
    />
  );
};

const mapStateToProps = state => ({ code: state.code });
const mapDispatchToProps = dispatch => ({ onTodoClick: () => dispatch() });

const CodeStageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(codeStage);

export default CodeStageContainer;
