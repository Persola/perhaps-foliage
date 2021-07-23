import * as React from "react";
import type { ReduxStore } from "../../types/redux-store";
type Props = {
  editorStateStore: ReduxStore;
  interpreting: boolean;
};

const dispatchStartInterpretation = editorStateStore => {
  editorStateStore.dispatch({
    type: 'START_INTERPRETATION'
  });
};

export default ((props: Props) => {
  const {
    editorStateStore,
    interpreting
  } = props;
  const className = interpreting ? 'interpreting' : '';

  const startInterpretation = () => dispatchStartInterpretation(editorStateStore);

  return <button onClick={startInterpretation} className={className} type="submit">
      interpret
    </button>;
});