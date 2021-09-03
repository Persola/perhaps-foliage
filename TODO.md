**currently**
* make Saliva function call optionally non-tree instead of child (notably for primitives)
* extract base presenter (need to move back to shared!)
* extract base renderer (need to move back to shared!)
* present per presno
  * presentation infastructure
  * render per presno
* choose AST format
  * (see 'research notes')
  * still considering Unist
  * ANTLR?
  * throwing out a few lines...

**maintenance**
* make Saliva function call optionally non-tree instead of child (notably for primitives)
* extract validity as service
  * LSP? or similar pattern at least
  * also move it out of presentation into syntaxland (a data structure on top of the tree)
  * just one kind of AST-derived data among many, so develop pattern for any such thing
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
* **?** adopt some tree version of Backaus-Naur form for grammar? (move other info into new file)
  * What I really need is what children each type is allowed
    * BNF doesn't seem like a stright-forward expression of that

**new functionality**
* VSCode extension
  * implement undo/redo
  * reversion or whatever else is left
* rendering
  * render all existing values
    * first just test what's missing?
* editing
  * add buds
    * they form holes (related to syno deletion)
    * they can be placed and moved arbitarily to create synos
      * they could autocomplete come info based on context
* navigation
  * enter eigensyno
  * alt keys:
    * binary seek [command/whatever key]
    * select set (focus nudges boundary to include focused node) [shift key]
    * move/shift/reorder selected nodes [option key]
      * e.g. move up/down in list
      * group selected nodes?
    * **?** switch been on and between nodes ('insert mode')--or should that be done through navigation as currently?
      * can we do without given the shift? I don't think so, b/c copy/paste needs to be in between nodes
        * can holes be used for what insert mode would be?
  * add selection (in addition to focus)
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
* wait, so if call graph mode is supposed to be as native as lexical mode, doesn't it have to handle graphs generally?
  * yes, but call graphs are still directed, so aiming for some kind of directed graph
    * there are two implicit directions: tree parent ~ caller ~ referencer, tree child ~ callee ~ referent
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
