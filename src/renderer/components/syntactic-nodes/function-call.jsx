// @flow
import React from 'react';
import SyntacticNode from './../syntactic-node.jsx'
import NamePart from './../vis/name-part.jsx'
import type { presentationGraph } from '../../../types/presentations/presentation-graph'
import type { functionCallPres } from '../../../types/presentations/function-call'

type Props = {
  codePresentation: functionCallPres
}

const argumentEls = (argumentz: presentationGraph[]) => {
  return (
    Object.values(argumentz).map((arg, ind) => {
      if (arg.klass === 'booleanLiteral') {
        return (
          <SyntacticNode key={`arg_${ind + 1}`} codePresentation={arg} />
        )
      } else if (arg.klass === 'functionCall') {
        return (
          <SyntacticNode key={`arg_${ind + 1}`} codePresentation={arg} />
        )
      } else {
        throw new Error('should be unreachable (new type?)')
      }
    })
  );
}

export default (props: Props) => {
  const codePresentation: functionCallPres = props.codePresentation;

  const name = codePresentation.nor ? 'NOR' : codePresentation.name;
  const argumentz = codePresentation.argumentz;
  const classes = `same-line expression ${codePresentation.resolved ? 'function-call' : 'unresolved'} ${codePresentation.focusNode ? 'focused' : 'unfocused'}`;

  return (
    <div className={classes}>
      <NamePart namePart={name} />
      {
        argumentEls(argumentz)
      }
    </div>
  );
};
