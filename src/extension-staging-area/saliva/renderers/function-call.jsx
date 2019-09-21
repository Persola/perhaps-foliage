// @flow
import React from 'react';
import SyntacticNode from '../../../renderer/components/syntactic-node.jsx'
import NamePart from '../../../renderer/components/vis/name-part.jsx'

import type { SynoId } from '../../../types/syno-id'
import type { GrammarName } from '../../../types/editor-state/grammar-name'
import type { Presno } from '../../../types/presenter/presno'
import type { PresnoRef } from '../../../types/presenter/presno-ref'
import type { FunctionCallPres } from '../types/presentations/function-call'

type Props = {
  grammar: GrammarName,
  getPresno: (SynoId) => Presno,
  presno: FunctionCallPres
}

const argumentEls = (grammar: GrammarName, getPresno: (SynoId) => Presno, argumentz: PresnoRef[]) => {
  return (
    argumentz.map((argRef: PresnoRef, ind) => {
      return (
        <SyntacticNode grammar={grammar} key={`arg_${ind + 1}`} getPresno={getPresno} synoId={argRef.id} />
      )
    })
  );
}

export default (props: Props) => {
  const { grammar, getPresno, presno } = props;
  const { presnoFocused, charFocused } = presno;
  const { name, callee, resolved, focused, valid } = presno;

  const argumentz = argumentEls(grammar, getPresno, presno.argumentz);
  const classes = `syno ${resolved ? 'function-call' : 'unresolved'} ${focused ? 'focused' : 'unfocused'} ${valid ? '' : 'invalid'}`;

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      {
        name &&
          <NamePart namePart={name} focused={presnoFocused === 0} charFocused={charFocused} />
      }
      { argumentz }
      {
        callee &&
          <SyntacticNode grammar={grammar} getPresno={getPresno} synoId={callee.id} />
      }
    </div>
  );
};
