**currently**
* presno vs. syno clarification
  * consider forChildSynoOf/forSynoRefIn vs. getChildpresnos
    * the presentation only contains synos, presnos are implicit inside syno presentations
  * left field: perpetuate presno tree?

**maintenance**
* Try changing the 'lib' compiler option to 'es2019' or later, flatten in veryifyReplacement...
* why is integration passed to presenters?
* make Saliva function call optionally non-tree instead of child (notably for primitives)
* make textHostRef a kind of synoRef (to simplify grammar)
* break out packages
  * clean up
    * webpack configs' HTMLplugin index path (el)
  * more packages
    * base language integration package
      * for extension, but should there also be scaffolding?
      * extract base presenter (need to move back to shared!)
      * extract base renderer (need to move back to shared!)
    * extract visualization as package with editors as consumers
      * compare editor (without REPL) vs. REPL/console
      * at this point mostly just creating package boundary between code views
        * need to pass TreeId with commands
        * after store update decide which trees to present (even though react would handle it fine)
* what does vsc do to hot load extensions?
* **?** adopt unist
  * **?** and some utils from its ecosystem
* documentation
  * priority: lang integration interface
* **?** catch coreside errors and show on renderside
* force actions to go through an interface (to become API) (by encapsulating store?)
* wrap syntrees in file with metadata (root ID)
* **?** systematic method to generate IDs
* **?** use for child syno of in inverse reference map and destroy syno (combine with getChildpresnos?)
* **?** use proxy-memoize or another selector memoizer

**new functionality**
* VSCode extension
  * implement undo/redo
  * reversion or whatever else is left
* rendering
  * render all existing values
    * first just test what's missing?
* editing
  * complete syno deletion
  * add syno insertation
    * add holes for necessary missing synos
    * create a ambiguity egg, then just move it into place using shift key combo
      * has type on low level, but automatically changes type by copying the last syno it was shifted over or nesting in a hole
* navigation
  * enter eigensyno
  * alt keys:
    * binary seek
    * select set (focus nudges boundary to include focused node)
    * move/shift/reorder selected nodes
      * e.g. move up/down in list
      * group selected nodes?
    * **?** switch been on and between nodes ('insert mode')--or should that be done through navigation as currently?
    * can we do without given the shift? I don't think so, b/c copy/paste needs to be in between nodes
      * can holes be used for what insert mode would be?
  * **?** add selection (in addition to focus)
  * **?** traversing nav history
  * **?** navigating non-tree syno references (how see references of current focus?)
* function signatures
  * name part and argument order, both in call and def
    * [_saliva_] optional arguments
    * [_saliva_] ordered arguments
    * [_saliva_] singular arguments
* [_saliva_] add Nothing type
  * replace nulls in type data structures
* add ancestor context presenter API to support context-sensative grammars but make it explicit
  * context would be provided in presentation, not done in renderer
* [_saliva_] make types synos (beneath default visiblity level)
* [_saliva_] wrap some features (e.g., named parameters) in language (e.g., always pass a map or list), see Nothing above

**rearchitecture**
* **?** diffing algorithm for syntree -> prestree transformation?
* **?** replace react with prestree -> rendering diffing algorithm fomore appropriate for AST manipulation?
  * first just profile it a bit

**design**
* wait, should synos actually have IDs?
  * that is to say, should unique IDs be replaced with IDs based on the path from the root?
    * when a node is grafted, the editor can handle updating references
  * simplifies IDs and node ontology (as in identity, not structure)
  * but are there times when references need to be hard? say across package boundaries
* how to divise types:
  * reference assignment (name, value), reference invocation, maps/objects

**longview**
* write JSON integration
* write integration for a real, in-use general-purpose programming language (Scheme?)
  * need bidirectional transformation between AST and text code (can use unist?)
* pick license
  * make sure contributors give up all copyright on offering contribution
* operationalize
* launch minimal viable project
