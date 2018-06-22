// @flow
import React from 'react';

import type { functionParameterPres } from '../../../types/presentations/function-parameter'

type Props = {
  codePresentation: functionParameterPres
}

export default (props: Props) => {
  const codePresentation: functionParameterPres = props.codePresentation;
  const classes = `syno same-line leaf expression bubble-even function-parameter ${codePresentation.focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={codePresentation.synoId}>
      {String(codePresentation.slot)}
    </div>
  );
};
