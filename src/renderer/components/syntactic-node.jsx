// @flow
import * as React from 'react';

import salivaPresenters from '../../extension-staging-area/saliva/renderers/renderers.js';
import pantheonPresenters from '../../extension-staging-area/pantheon/renderers/renderers.js';

import type { SynoRendererProps } from '../../types/syno-renderer-props';
import type { Presno } from '../../types/presenter/presno';

const RENDERERS_BY_GRAMMAR = {
  saliva: salivaPresenters,
  pantheon: pantheonPresenters,
};

export default (props: SynoRendererProps) => {
  const { grammarName, synoId, getPresno, SynoRenderer } = props;
  const presno: Presno = getPresno(synoId);

  const grammarRenderer = RENDERERS_BY_GRAMMAR[grammarName];
  if (!grammarRenderer) {
    throw new Error('unrecognized grammar');
  }

  const SyntypeRenderer = grammarRenderer[presno.syntype];
  if (SyntypeRenderer) {
    return (
      <SyntypeRenderer
        grammarName={grammarName}
        getPresno={getPresno}
        presno={presno}
        SynoRenderer={SynoRenderer}
      />
    );
  }
  throw new Error(`unrecognized type: '${presno.syntype}'`);
};
