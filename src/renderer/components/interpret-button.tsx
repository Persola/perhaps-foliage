import * as React from 'react';

import type { Store } from 'redux';

type Props = {
  editorStateStore: Store;
  interpreting: boolean;
};

const dispatchStartInterpretation = editorStateStore => {
  editorStateStore.dispatch({
    type: 'START_INTERPRETATION',
  });
};

export default (props: Props): JSX.Element => {
  const { editorStateStore, interpreting } = props;
  const className = interpreting ? 'interpreting' : '';

  const startInterpretation = () => dispatchStartInterpretation(editorStateStore);

  return (
    <button onClick={startInterpretation} className={className} type="submit">
      interpret
    </button>
  );
};
