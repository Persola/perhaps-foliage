// @flow
import React from 'react';
import SyntacticNode from './../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'

import type { FunctionCallPres } from '../../../types/presentations/function-call'
import type { Presno } from '../../../types/presentations/presno'
import type { PresnoRef } from '../../../types/presentations/presno-ref'
import type { SynoId } from '../../../types/syno-id'

type Props = {
  getPresno: (SynoId) => Presno,
  presno: FunctionCallPres
}

const argumentEls = (getPresno: (SynoId) => Presno, argumentz: PresnoRef[]) => {
  return (
    argumentz.map((argRef: PresnoRef, ind) => {
      return (
        <SyntacticNode key={`arg_${ind + 1}`} getPresno={getPresno} synoId={argRef.id} />
      )
    })
  );
}

export default (props: Props) => {
  const { getPresno, presno } = props;
  const { presnoFocused, charFocused } = presno;
  const { name, callee, resolved, focused, valid } = presno;

  const argumentz = argumentEls(getPresno, presno.argumentz);
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
          <SyntacticNode getPresno={getPresno} synoId={callee.id} />
      }
    </div>
  );
};
