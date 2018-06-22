// @flow
import React from 'react';

import type { FunctionParameterPres } from '../../../types/presentations/function-parameter'

type Props = {
  codePresentation: FunctionParameterPres
}

export default (props: Props) => {
  const codePresentation: FunctionParameterPres = props.codePresentation;
  const classes = `syno same-line leaf expression bubble-even function-parameter ${codePresentation.focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={codePresentation.synoId}>
      {String(codePresentation.slot)}
    </div>
  );
};
