// @flow
import React from 'react';
import SyntacticNode from './../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'
import typedValues from '../../../flow-pacifiers/typed-values'

import type { FunctionCallPres } from '../../../types/presentations/function-call'
import type { Argumentz } from '../../../types/presentations/argumentz'
import type { Presno } from '../../../types/presentations/presno'
import type { PresnoRef } from '../../../types/presentations/presno-ref'
import type { SynoId } from '../../../types/syno-id'

type Props = {
  getPresno: (SynoId) => Presno,
  presno: FunctionCallPres
}

const argumentEls = (getPresno: (SynoId) => Presno, argumentzz: Argumentz) => {
  return (
    typedValues(argumentzz).map((argRef: PresnoRef, ind) => {
      return (
        <SyntacticNode key={`arg_${ind + 1}`} getPresno={getPresno} presnoId={argRef.id} />
      )
    })
  );
}

export default (props: Props) => {
  const { getPresno, presno } = props;
  const { name, bodyRef, resolved, focused } = presno;

  const argumentzz = argumentEls(getPresno, presno.argumentz);
  const classes = `syno ${resolved ? 'function-call' : 'unresolved'} ${focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      {
        name ?
          <NamePart namePart={name} />
          : ''
      }
      { argumentzz }
      {
        bodyRef ?
          <SyntacticNode getPresno={getPresno} presnoId={bodyRef.id} />
          : ''
      }
    </div>
  );
};
