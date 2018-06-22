// @flow
import React from 'react';
import SyntacticNode from '../syntactic-node.jsx'
import FunctionParameter from './function-parameter.jsx'
import NamePart from './../vis/name-part.jsx'

import type { FunctionDefPres } from '../../../types/presentations/function-definition'
import type { FunctionParameterPres } from '../../../types/presentations/function-parameter'

type Props = {
  codePresentation: FunctionDefPres
}

export default (props: Props) => {
  const codePresentation: FunctionDefPres = props.codePresentation;
  const { name } = codePresentation;
  const parameterz: FunctionParameterPres[] = codePresentation.parameterz;
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
      <SyntacticNode codePresentation={codePresentation.body} />
    </div>
  );
};
