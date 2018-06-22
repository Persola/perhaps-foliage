// @flow
import React from 'react';
import type { BooleanLiteralPres } from '../../../types/presentations/boolean-literal'

type Props = {
  codePresentation: BooleanLiteralPres
}

export default (props: Props) => {
  const { codePresentation } = props;
  if (codePresentation.syntype !== 'booleanLiteral') {
    throw new Error('non-boolean masquerading as boolean');
  }

  const classes = `syno same-line leaf bubble-even argument boolean-literal ${codePresentation.focused ? 'focused' : 'unfocused'}`

  return (
    <div className={classes} data-syno-id={codePresentation.synoId}>
      {String(codePresentation.value)}
    </div>
  );
};
