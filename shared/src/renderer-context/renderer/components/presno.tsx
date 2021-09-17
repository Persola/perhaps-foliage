import * as React from 'react';

import NamePart from './presnos/name-part';

import type { Presno } from '../../../types/presenter/presno';
import type { PresnoRendererProps } from '../../../types/renderer/presno-renderer-props';

export default (props: PresnoRendererProps): JSX.Element => {
  const { integration, synoId, getPresno, PresnoRenderer } = props;
  const presno: Presno = getPresno(synoId);

  let SyntypeRenderer;
  if (presno.prestype === 'NamePart') {
    SyntypeRenderer = NamePart;
  } else {
    SyntypeRenderer = integration.renderers[presno.prestype];
  }

  if (SyntypeRenderer) {
    return (
      <SyntypeRenderer
        NamePart={NamePart}
        integration={integration}
        getPresno={getPresno}
        presno={presno}
        PresnoRenderer={PresnoRenderer} // (itself)
      />
    );
  }

  throw new Error(`Missing renderer for syntype '${presno.syntype}'`);
};