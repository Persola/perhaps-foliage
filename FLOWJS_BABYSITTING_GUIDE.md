Disjoint union types' subtypes must share a single distinguishing attribute WHICH MUST TYPED AS A LITERAL IN EACH

retyping is mandatory inside callbacks:
<!-- const argumentEls = (argumentz: any[]) => {
  return (
    argumentz.map((arg, ind) => {
      if (arg.klass === 'booleanLiteral') {
        return (
          <SyntacticNode key={`arg_${ind + 1}`} syntacticGraph={arg} />
        )
      } else {
        return (
          <SyntacticNode key={`arg_${ind + 1}`} syntacticGraph={arg} />
        )
      }
    })
  );
} -->
