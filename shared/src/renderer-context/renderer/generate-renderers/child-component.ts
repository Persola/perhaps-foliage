import * as React from 'react';

import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { SharedRendererProps } from '../../../types/renderer/shared-renderer-props';

export default (
  parentProps: SharedRendererProps,
  presnoRef: PresnoRef,
): React.ReactElement => {
  const {
    PresnoRenderer,
    integration,
    getPresno,
  } = parentProps;

  return React.createElement(PresnoRenderer, {
    integration,
    getPresno,
    synoId: presnoRef.id,
    PresnoRenderer,
    key: presnoRef.id,
  });
};
