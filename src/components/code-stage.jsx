// @flow
import React from 'react';
import { connect } from 'react-redux';

import SyntacticalNode from './syntactical-node.jsx';

type Props = {
  stageful: Object
}

export const CodeStage = (props: Props) => {
  const { stageful } = props;

  if (stageful === false) {
    return (
      <div>
        (Code stage is empty)
      </div>
    );
  }

  return (
    <SyntacticalNode serialization={stageful} />
  );
};

export const mapStateToProps = (state: Object) => ({ stageful: state.stageful });
export const mapDispatchToProps = () => ({});

const CodeStageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeStage);

export default CodeStageContainer;
