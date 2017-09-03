// @flow
import React from 'react';
import { connect } from 'react-redux';

import SyntacticalNode from './syntactical-node.jsx';

type Props = {
  code: Object
}

export const CodeStage = (props: Props) => {
  const { code } = props;

  return (
    <SyntacticalNode serialization={code} />
  );
};

const mapStateToProps = state => ({ code: state.code });
const mapDispatchToProps = dispatch => ({ onTodoClick: () => dispatch() });

const CodeStageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeStage);

export default CodeStageContainer;
