import * as React from 'react';

import NamePart from './presnos/name-part';
import Gap from './presnos/gap';
import Bud from './presnos/bud';

import type { Presno } from '../../../types/presenter/presnos/presno';
import type { PresnoRendererProps } from '../../../types/renderer/presno-renderer-props';

export default (props: PresnoRendererProps): JSX.Element => {
  const { integration, presnoId, getPresno, PresnoRenderer } = props;
  const presno: Presno = getPresno(presnoId);

  let SyntypeRenderer;
  if (presno.prestype === 'namePart') {
    SyntypeRenderer = NamePart;
  } else if (presno.prestype === 'gap') {
    SyntypeRenderer = Gap;
  } else if (presno.prestype === 'bud') {
    SyntypeRenderer = Bud;
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

  throw new Error(`Missing renderer for syntype '${presno.prestype}'`);
};
