// @flow
import React from 'react';

type Props = {
  interpret: Function
}

export default (props: Props) => {
  const { interpret } = props;

  return (
    <button onClick={interpret}>
      interpret
    </button>
  );
};
