* maintenance
  * have presenters only return one presno attrs, never collections (for typing/consistency)
  * why function calls validate against grammar saying no callee as child?
  * extract Saliva-specific modules as local npm packages
    * inject dependencies to prevent bundling duplicates
    * integration security
    * integration validation
    * re-evaluate use of eval
    * document interface
    * ability to export types to language libraries
    * actually make libraries for saliva and pantheon
  * presno and syno clarification
  * extract visualization as package with editor as consumer
    * compare editor (without REPL) vs. REPL/console
    * at this point mostly just creating package boundary between code views
      * need to pass TreeId with commands
      * after store update decide which trees to present (even though react would handle it fine)
  * wait, should synos actually have IDs?
    * that is to say, should unique IDs be replaced with ids based on the path from the root?
      * when a node is grafted, the editor can handle updating references
    * simplifies IDs and node ontology (as in identity, not structure)
  * ascend to root extract error message
  * force actions to go through an interface (to become API) (by encapsulating store?)
  * wrap syntrees in file with metadata (root ID)
  *  systematic method to generate IDs
  * adopt Typescript
  * [?] adopt unist and its ecosystem
  * [?] use for child syno of in inverse reference map and destroy syno (combine with getChildpresnos?)
  * [?] use proxy-memoize or another selector memoizer
  * [?] organize types
  * [?] add flow-runtime
  * [?] add prettier
    * also just look at prettier to get an idea of how to do formatting
  * [?] port to VSCode extension :(
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
  * alt keys:
    * binary seek
    * select set (focus nudges boundary to include focused node)
    * move/shift/reorder selected nodes
      * e.g. move up/down in list
      * group selected nodes?
    * [?] switch been on and between nodes ('insert mode')--or should that be done through navigation as currently?
      * can we do without given the shift? I don't think so, b/c copy/paste needs to be in between nodes
        * can holes be used for what insert mode would be?
    * [?] enter eigensyno
    * [?] traversing nav history
    * [?] navigating non-tree syno references (how see references of current focus?)
  * make saliva types synos (beneath default visiblity level)
  * write integration for a real, in-use language
    * need bidirectional transformation between AST and text code
  * wrap some features (e.g., named parameters) in language (e.g., always pass a map or list), see Nothing above
* rearchitecture
  * [?] reorg to extract visualization elements for possible sister projects like a console/editor vs repl/git diff
  * react-like diffing algorithm for presentation?
  * replace react with diffing algorithm better suited for ast manipulation?
    * first just profile it a bit
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
