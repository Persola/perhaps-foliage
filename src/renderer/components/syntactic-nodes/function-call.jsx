// @flow
import React from 'react';
import SyntacticNode from './../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'

import type { PresentationGraph } from '../../../types/presentations/presentation-graph'
import type { FunctionCallPres } from '../../../types/presentations/function-call'
import type { Argumentz } from '../../../types/presentations/argumentz'

type Props = {
  codePresentation: FunctionCallPres
}

const argumentEls = (argumentzz: Argumentz) => {
  return (
    argumentzz.map((arg: PresentationGraph, ind) => {
      return (
        <SyntacticNode key={`arg_${ind + 1}`} codePresentation={arg} />
      )
    })
  );
}

export default (props: Props) => {
  const codePresentation: FunctionCallPres = props.codePresentation;
  const { name } = codePresentation;

  const argumentzz: Argumentz = codePresentation.argumentz;
  const classes = `syno same-line expression ${codePresentation.resolved ? 'function-call' : 'unresolved'} ${codePresentation.focused ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes} data-syno-id={codePresentation.synoId}>
      <NamePart namePart={name} />
      {
        argumentEls(argumentzz)
      }
    </div>
  );
};
