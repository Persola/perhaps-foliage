// @flow
import React from 'react';

import salivaPresenters from '../../extension-staging-area/saliva/renderers/renderers.js'
import pantheonPresenters from '../../extension-staging-area/pantheon/renderers/renderers.js'

import type { GrammarName } from '../../types/editor-state/grammar-name'
import type { Presno } from '../../types/presenter/presno'
import type { SynoId } from '../../types/syno-id'

type Props = {
  grammarName: GrammarName,
  getPresno: (SynoId) => Presno,
  synoId: SynoId
}

const RENDERERS_BY_GRAMMAR = {
  saliva: salivaPresenters,
  pantheon: pantheonPresenters
}

export default (props: Props) => {
  const { grammarName, synoId, getPresno } = props;
  const presno: Presno = getPresno(synoId);

  const grammarRenderer = RENDERERS_BY_GRAMMAR[grammarName];
  if (!grammarRenderer) {
    throw new Error('unrecognized grammar');      
  }

  const SynoRenderer = grammarRenderer[presno.syntype];
  if (SynoRenderer) {
    return(
      <SynoRenderer grammarName={grammarName} getPresno={getPresno} presno={presno} />
    )
  } else {
    throw new Error(`unrecognized type: '${presno.syntype}'`);      
  }
};
