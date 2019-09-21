// @flow
import React from 'react';
import NamePart from '../../../renderer/components/vis/name-part.jsx'

import type { SynoId } from '../../../types/syno-id'
import type { Presno } from '../../../types/presenter/presno'
import type { GrammarName } from '../../../types/editor-state/grammar-name'
import type { VariableRefPres } from '../types/presentations/variable-ref'

type Props = {
  grammar: GrammarName,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: VariableRefPres
}

export default (props: Props) => {
  const { grammar, presno } = props;
  const { presnoFocused, charFocused, valid } = presno;
  const classes = `syno same-line leaf bubble-even variable-ref ${presno.focused ? 'focused' : 'unfocused'} ${valid ? '' : 'invalid'}`

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      {
        presno.name &&
          <NamePart namePart={presno.name} focused={presnoFocused === 0} charFocused={charFocused} />
      }      
    </div>
  );
};
