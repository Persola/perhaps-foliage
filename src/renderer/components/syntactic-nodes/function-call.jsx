// @flow
import React from 'react';
import SyntacticNode from './../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'

import type { presentationGraph } from '../../../types/presentations/presentation-graph'
import type { functionCallPres } from '../../../types/presentations/function-call'
import type { argumentz } from '../../../types/presentations/argumentz'

type Props = {
  codePresentation: functionCallPres
}

const argumentEls = (argumentzz: argumentz) => {
  return (
    argumentzz.map((arg: presentationGraph, ind) => {
      return (
        <SyntacticNode key={`arg_${ind + 1}`} codePresentation={arg} />
      )
    })
  );
}

export default (props: Props) => {
  const codePresentation: functionCallPres = props.codePresentation;
  const { name } = codePresentation;

  const argumentzz: argumentz = codePresentation.argumentz;
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
