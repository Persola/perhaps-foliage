Disjoint union types' subtypes must share a single distinguishing attribute WHICH MUST TYPED AS A LITERAL IN EACH

refining types is mandatory inside callbacks:
<!-- (mapTargets: (A | B)[]) => {
  return (
    mapTargets.map((el, ind) => {
      if (el.syntype === 'A') {
        return el.somethingUnrelated;
      } else {
        return el.somethingUnrelated;
      }
    })
  );
} -->

Flow's got whack types for some native functions

I turned:
  if (![
    'functionDefinition',
    'functionParameter'
  ].includes(textHostSyno.syntype)) {
into:
  if (
    textHostSyno.syntype !== 'functionDefinition' &&
    textHostSyno.syntype !== 'functionParameter'
  ) {
...and it worked. I guess because they're worried includes modifies? 

to understand:
  * what is first curly brackets in this syntax from docs: function acceptsMaybeProp({ value }: { value: ?number }) {

reminders:
  * predicate functions
    * 'You can fix this by making truthy a predicate function, by using the %checks annotation like so:''
  * $ReadOnlyArray’s type parameter is covariant while Array’s type parameter is invariant
  * known unsoundness:
    * Array access is unsafe
  * Function and Object are deprecated

code smells:
  * Object, Any
    * the regex '\w+ \= \(\(\w+\: any\)\:' (roughly) is used to force a type
  * The disabled lines, search '\$Flow'
