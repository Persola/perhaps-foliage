import * as React from 'react';

import type { Store } from 'redux';

type Props = {
  editorStateStore: Store;
};

const dispatchIntegrationLoad = (e, editorStateStore) => {
  editorStateStore.dispatch({
    type: 'START_INTEGRATION_LOAD',
    file: e.target.files[0],
  });
};

export default (props: Props): JSX.Element => {
  const { editorStateStore } = props;

  const loadIntegration = e => dispatchIntegrationLoad(e, editorStateStore);

  return (
    <input
      type="file"
      id="integrationLoad"
      name="integrationLoad"
      accept="text/javascript"
      onChange={loadIntegration}
    />
  );
};
