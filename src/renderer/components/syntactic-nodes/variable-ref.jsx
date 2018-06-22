// @flow
import React from 'react';
import type { VariableRefPres } from '../../../types/presentations/variable-ref'

type Props = {
  codePresentation: VariableRefPres
}

export default (props: Props) => {
  const { codePresentation } = props;
  const classes = `syno same-line leaf bubble-even argument variable-ref ${codePresentation.focused ? 'focused' : 'unfocused'}`

  return (
    <div className={classes} data-syno-id={codePresentation.synoId}>
      {codePresentation.name}
    </div>
  );
};
