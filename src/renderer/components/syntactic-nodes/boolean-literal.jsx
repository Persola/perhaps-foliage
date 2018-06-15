// @flow
import React from 'react';
import type { booleanLiteralPres } from '../../../types/presentations/boolean-literal'

type Props = {
  codePresentation: booleanLiteralPres
}

export default (props: Props) => {
  const { codePresentation } = props;
  if (codePresentation.klass !== 'booleanLiteral') {
    throw new Error('non-boolean masquerading as boolean');
  }

  const classes = `same-line leaf bubble-even argument boolean-literal ${codePresentation.focused ? 'focused' : 'unfocused'}`

  return (
    <div className={classes}>
      {String(codePresentation.value)}
    </div>
  );
};
