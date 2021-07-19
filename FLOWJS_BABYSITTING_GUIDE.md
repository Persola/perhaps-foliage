to understand:
  * what is first curly brackets in this syntax from docs: function acceptsMaybeProp({ value }: { value: ?number }) {
    * oh its just destructuring, not typing?

reminders:
  * Disjoint union types' subtypes must share a single distinguishing attribute WHICH MUST TYPED AS A LITERAL IN EACH
  * refining types is mandatory inside callbacks
  * Flow's got whack types for native functions
  * a === 'string' || b === 'string' can work where [a, b].includes('string') does not
  * predicate functions
    * 'You can fix this by making truthy a predicate function, by using the %checks annotation like so:''
  * $ReadOnlyArray’s type parameter is covariant while Array’s type parameter is invariant
  * Function and Object are deprecated

code smells:
  * Object, Any
    * the regex '\w+ \= \(\(\w+\: any\)\:' (roughly) is used to force a type
  * The disabled lines, search '\$Flow'
