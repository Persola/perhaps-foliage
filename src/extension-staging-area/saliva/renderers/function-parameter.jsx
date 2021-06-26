// @flow
import React from 'react';
import NamePart from '../../../renderer/components/vis/name-part.jsx'

import type { SynoId } from '../../../types/syno-id'
import type { GrammarName } from '../../../types/editor-state/grammar-name'
import type { Presno } from '../../../types/presenter/presno'
import type { FunctionParameterPres } from '../types/presentations/function-parameter'

type Props = {
  grammarName: GrammarName,
  getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  presno: FunctionParameterPres
}

export default (props: Props) => {
  const { grammarName, presno } = props;
  const { presnoFocused, charFocused } = presno;
  const classes = `syno same-line leaf bubble-even function-parameter ${presno.focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={presno.synoId}>
      <NamePart namePart={presno.slot} focused={presnoFocused === 0} charFocused={charFocused} />
    </div>
  );
};
