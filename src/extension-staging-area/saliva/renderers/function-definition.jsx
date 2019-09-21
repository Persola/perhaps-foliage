// @flow
import React from 'react';
import SyntacticNode from '../../../renderer/components/syntactic-node.jsx'
import NamePart from '../../../renderer/components/vis/name-part.jsx'

import type { SynoId } from '../../../types/syno-id'
import type { GrammarName } from '../../../types/editor-state/grammar-name'
import type { Presno } from '../../../types/presenter/presno'
import type { PresnoRef } from '../../../types/presenter/presno-ref'
import type { FunctionDefPres } from '../types/presentations/function-definition'

type Props = {
  grammar: GrammarName,
  getPresno: (SynoId) => Presno,
  presno: FunctionDefPres
}

export default (props: Props) => {
  const { grammar, getPresno, presno } = props;
  const { name, focused, presnoFocused, charFocused, valid } = presno;
  const parameters: PresnoRef[] = presno.parameters;
  const classes = `syno function-definition ${presno.focused ? 'focused' : 'unfocused'} ${valid ? '' : 'invalid'}`;

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      <NamePart
        namePart={name}
        focused={presnoFocused === 0}
        charFocused={charFocused}
      />
      {
        parameters.map(paramRef => {
          return(
            <SyntacticNode grammar={grammar} key={paramRef.id} getPresno={getPresno} synoId={paramRef.id} />
          )
        })
      }
      {
        presno.body &&
          <SyntacticNode grammar={grammar} getPresno={getPresno} synoId={presno.body.id} />
      }
    </div>
  );
};
