// @flow
import React from 'react';
import SyntacticNode from '../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'

import type { Presno } from '../../../types/presentations/presno'
import type { SynoId } from '../../../types/syno-id'
import type { PresnoRef } from '../../../types/presentations/presno-ref'
import type { FunctionDefPres } from '../../../types/presentations/function-definition'

type Props = {
  getPresno: (SynoId) => Presno,
  presno: FunctionDefPres
}

export default (props: Props) => {
  const { getPresno, presno } = props;
  const { name } = presno;
  const parameters: PresnoRef[] = presno.parameters;
  const classes = `syno function-definition ${presno.focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      <NamePart namePart={name} />
      {
        parameters.map(paramRef => {
          return(
            <SyntacticNode key={paramRef.id} getPresno={getPresno} presnoId={paramRef.id} />
          )
        })
      }
      <SyntacticNode getPresno={getPresno} presnoId={presno.body.id} />
    </div>
  );
};
