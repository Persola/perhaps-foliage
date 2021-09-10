import * as React from 'react';

import NamePart from './vis/name-part';

import type { Presno } from '../../../types/presenter/presno';
import type { SynoRendererProps } from '../../../types/renderer/syno-renderer-props';

export default (props: SynoRendererProps): JSX.Element => {
  const { integration, synoId, getPresno, SynoRenderer } = props;
  const presno: Presno = getPresno(synoId);
  const SyntypeRenderer = integration.renderers[presno.syntype];

  if (SyntypeRenderer) {
    return (
      <SyntypeRenderer
        NamePart={NamePart}
        integration={integration}
        getPresno={getPresno}
        presno={presno}
        SynoRenderer={SynoRenderer}
      />
    );
  }

  throw new Error(`Missing renderer for syntype '${presno.syntype}'`);
};
