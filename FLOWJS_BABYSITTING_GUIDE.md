Disjoint union types' subtypes must share a single distinguishing attribute WHICH MUST TYPED AS A LITERAL IN EACH

refining types is mandatory inside callbacks:
<!-- (mapTargets: (A | B)[]) => {
  return (
    mapTargets.map((el, ind) => {
      if (el.klass === 'A') {
        return el.somethingUnrelated;
      } else {
        return el.somethingUnrelated;
      }
    })
  );
} -->
