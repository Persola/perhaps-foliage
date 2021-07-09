* maintenance
  * move core syno attrs back to editor
  * reorg
    * presno and syno clarification
    * move command validity checks into reducers (concurrent redux commands)
    * organize utilities/wrap some data in objects
  * wait, should synos actually have IDs?
    * that is to say, should unique IDs be replaced with ids based on the path from the root?
      * when a node is grafted, the editor can handle updating references
    * simplifies IDs and node ontology (as in identity, not structure)
  * ascend to root extract error message
  * extract Saliva-specific modules as local npm packages
    * start loading language components dynamically
      * security?
    * centralize interface
      * document it
    * ability to export types to language libraries
    * actually make libraries for saliva and pantheon
  * [?] use for child syno of in inverse reference map and destroy syno
  * [?] organize types
  * [?] add flow-runtime
  * [?] add prettier
    * also just look at prettier to get an idea of how to do formatting
  * make interpretation async
  * [?] reorg to extract visualization elements for possible sister projects like a console/editor vs repl/git diff
* new functionality
  * add ancestor context presenter API to support context-sensative grammars but make it explicit
    * context would be provided in presentation, not done in renderer
  * complete syno deletion
  * add syno insertation
    * add holes for necessary missing synos
    * create a ambiguity egg, then just move it into place using shift key combo
      * has type on low level, but automatically changes type by copying the last syno it was shifted over or nesting in a hole
  * [?] add selection (in addition to focus)
  * enable interpretation->rendering of all existing values
  * render function signatures
    * name part and argument order, both in call and def
    * [later] optional arguments
    * [later] ordered arguments
    * [later] singular arguments
  * add Nothing type
    * replace false flags in type data structures
  * possible alt keys:
    * binary seek
    * select set
    * switch been on and between nodes ('insert mode')--or should that be done through navigation as currently?
    * move/shift/reorder selected nodes
      * e.g. move up/down in list
      * group selected nodes?
    * traversing nav history
    * navigating non-tree syno references (how see references of current focus?)
  * make saliva types synos (beneath default visiblity level)
  * write integration for a real, in-use language
    * need bidirectional transformation between AST and text code
  * wrap some features (e.g., named parameters) in language (e.g., always pass a map or list), see Nothing above
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
* design
  * is it OK to not have functionCall display its callee is a syno?
    * yes--the callee is a separate node but it's a non-tree reference, which is now declared in the synoref. only children are displayed.
  * how to divise types:
    * reference assignment (name, value), reference invocation, maps/objects
* longview
  * pick license
    * make sure contributors give up all copyright on offering contribution
  * package (some?) subprojects
  * [?] update babel es version
  * operationalize
  * release minimal viable project
