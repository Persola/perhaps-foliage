// @flow
import React from 'react';
import SyntacticNode from '../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'

import type { Grammar } from '../../types/editor-state/grammar'
import type { Presno } from '../../../types/presentations/presno'
import type { SynoId } from '../../../types/syno-id'
import type { PresnoRef } from '../../../types/presentations/presno-ref'
import type { FunctionDefPres } from '../../../types/presentations/function-definition'

type Props = {
  grammar: Grammar,
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
