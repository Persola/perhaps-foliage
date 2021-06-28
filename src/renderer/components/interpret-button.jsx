// @flow
import * as React from 'react';

type Props = {
  interpret: Function,
  interpreting: boolean
}

export default (props: Props) => {
  const { interpret, interpreting } = props;

  const className = interpreting ? 'interpreting' : '';

  return (
    <button onClick={interpret} className={className} type="submit">
      interpret
    </button>
  );
};
