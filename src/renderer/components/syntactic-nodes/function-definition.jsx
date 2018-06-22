// @flow
import React from 'react';
import FunctionParameter from './function-parameter.jsx'
import NamePart from './../vis/name-part.jsx'

import type { functionDefPres } from '../../../types/presentations/function-definition'
import type { functionParameterPres } from '../../../types/presentations/function-parameter'

type Props = {
  codePresentation: functionDefPres
}

export default (props: Props) => {
  const codePresentation: functionDefPres = props.codePresentation;
  const { name } = codePresentation;
  const parameterz: functionParameterPres[] = codePresentation.parameterz;
  const classes = `syno same-line expression function-definition ${codePresentation.focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={codePresentation.synoId}>
      <NamePart namePart={name} />
      {
        parameterz.map(param => {
          return(
            <FunctionParameter key={param.slot} codePresentation={param} />
          )
        })
      }
    </div>
  );
};
