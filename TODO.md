* maintainence
  * extract Saliva-specific modules as local npm packages
  * separate command resolver from input resolver
  * split types into functional directories
* new functionality
  * add syno deletion and insertation
  * [?] add selection (in addition to focus)
  * add Nothing type
    * replace false flags in type data structures
* rearchitecture
  * [?] use redux in presenter again?
    * presenters are like reducers, but probably not because:
      * we only need one action (for generating a presentation) with a few parameters
      * going forward (e.g. adding closures) slices of the presentation graph will probably need to be generated with reference to large parts of the syntactic graph, so reducers can be divided by what syntactic state they have access to
    * but they should not mutate the syntactic state, just produce presentation state, and they should be organized by which part (well, which type etc.) they produce
    * should presentation also have a singular map of nodes?
    * seems like presentation actually needs to be like react-as-used-with-redux: it takes a big glob of data, needs to produce another (presenation vs. DOM) and it would be good if it could recognize that large parts of what it's received are duplicate and only generate and replace what's changed
      * the DOM overheads are taken care of by the original React instance
      * a new react instance would save time _generating the presentation_
        * but the presentation isn't _too_ big, much smaller than the syntactic tree in a large codebase
      * having to create components (as opposed to my own functions) isn't necessary but not too bad
      * looks like the diffing is inside ReactDom, not React, so being that I can't use ReactDom b/c it produces HTML, it may be infeasible to reuse their code
      * the diffing isn't worth it: a large proportion of presenters would need a large proportion of the state in their props to present, so they would largely get represented anyway
        * wait, no, I don't think they need the whole state--after all the point of typing is that you can do it locally, right? ...not sure if feasible
        * can also use react and just pass all props, if necessary I don't think it's architecturally wrong
      * problem: react components decide what other nodes to generate by choosing who their children will be starting from some root node. The presentation is centered on a node but has to render in several directions: mostly towards decendants but also to siblings, towards ancestors, and possibly to arbitrary references.
    * [?] replace interpreter with existing language interpreter (minus parsing?)
      * need bidirectional transformation between AST and text code
      * need to wrap some features (e.g., named parameters) in language (e.g., always pass a map or list)
      * how to deal with existing keywords and other shit that doesn't fit into bubble display? wrap with functions?
* longview
  * pick license
  * package (some?) subprojects
  * [?] update babel es version
  * operationalize
  * release minimal viable project

I understand the importance of:
* the directional causal cycle, not mutating parameters, etc.
* actions as atomic changes which trigger rerendering
* dividing reducers by state slice
  * though I don't see why it's more important than by action
    * but I guess people do it both--hard _not_ to divide by action

I don't understand:
  * why components can't get the whole state as props
    * similar to presentation generation getting the whole syno tree
