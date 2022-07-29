**currently**
* move integration load out of input file
* some of the types are ridiculous, need to parameterize
  * e.g. _RendersideUninitializedPresentLanguageIntegration_
* rendering
  * make sure a lot of Saliva- and pantheon-valid syntax is renderable
    * can maybe use more formal method to guaruntee renderability later
      * but only meaningful if the method is sufficiently indepedant of this impl.
        * fuzz with some existing tool for generating code under a grammar?

**bugs**
* when replacing node, remove its list of referents and its ID in other lists from the inverse references map

**maintenance**
* extract common logic from destroy syno and replace syno reducers as syntree utils
  * probably also rewrite replace to call extracted patterns of destroy + create?
    * no doing this is premature optimization
* renderer should derive child presno order straight from presno attrs
  * see LANGUAGE_INTEGRATION_SPEC
  * but keep rendererAttrs because there will need to be config later
    * e.g. what classes to apply for custom flags on presnos
* rename packages from `saliva-repl-*` format to something temporary?
  * because 'saliva' now clearly refers to the language
  * probably rename directory/repositories too, then
* rename 'saliva-core-integration.js' etc. for clarity
* clarify terminology around `shared`, `core-context`, and `editor-core`
  * rename `core-context` to `main-process` and `renderer-context` to `renderer-process`
  * use `heart` for redux/state management? (replacing `editor-core`)
  * use `base` instead of `shared`
* **?** presentation tree should also have grammar
* presentation read tools
  * **?** pure functional derive from synstate
  * **?** store/cache presentation
* some kind of plan for error catching
  * e.g., right now grammar and graph validation errors force reload
  * surface coreside errors and show on renderside
* adopt LSP
  * not very useful yet, but so the structure guides me
* language packages and shared should be peer dependencies?
* break out packages
  * just keep monorepo for now?
  * clean up
    * webpack configs' HTMLplugin index path (el)
  * more packages
    * base language integration package
      * for extension, but should there also be scaffolding?
    * extract visualization as package with editors as consumers
      * compare editor (without REPL) vs. REPL/console
      * at this point mostly just creating package boundary between code views
        * need to pass TreeId with commands
        * after store update decide which trees to present (even though react would handle it fine)
* wrap syntrees in file with metadata (root ID)
* force actions to go through an interface (to become API) (by encapsulating store?)
  * so there can be a CLI or other kinds of APIs later, not just GUI
  * redundant with LSP?
* **?** systematic method to generate IDs
* **?** use for child syno of in inverse reference map and destroy syno (combine with getChildpresnos?)
* **?** use proxy-memoize or another selector memoizer
* **?** adopt some tree version of Backaus-Naur form for grammar? (move other info into new file)
  * What I really need is what children each type is allowed?
    * well, that's probably significantly less expressive, what's needed? what do contemporary ASTs tend like?
      * edNCE?
* **?** pres validation
  * mismatching IDs was painful bug in pre after specifically guarding against it in syn
* **?** adopt unist
  * understand data attribute
  * are the attributes clear in general? Are some reserved/have specified meaning? e.g. tagName is in a unist-general util
  * how to deal with children
    * going back to having no flattened version seems infeasible
    * so the options are:
      * keeping just the flattened version, which unist-utils don't work for, so:
        * just adopt unist vaugely, but don't try to use utils
        * have steps where I unflatten and reflatten trees depending on how I need to work with them
          * bad for complexity/accessibility
          * bad for performance
      * have synos refer directly to children/parents, but also have them indexed by key
        * how to deal with limits of tree completion

**new functionality**
* documentation
  * priority: lang integration interface
* VSCode extension
  * implement undo/redo
  * reversion or whatever else is left
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

**design**
* **?** grammar stores all refs in one object, relation type is property of ref
  * allows language integrations to provide modular 'grammar's contributing relations
  * make Saliva function call optionally non-tree instead of child (notably for primitives)
* patterns for AST-derived data
  * syntax -> presentation
  * custom syno labels for integrations
  * LSP? or similar pattern
  * incrementalism, language integration modularity
  * I should probably be using tools/patterns from compilers?
  * broadest pattern would be tree-derived data caches subscribing to subgraphs of the tree they were derived from
* wait is the presentation actually a tree?
  * it is locally, but I may need to present e.g. siblings without parent
  * anyway I think 'locally treelike' is good enough
* how high of a priority is call graph mode?
  * the AST visualization is space nested, which can only visualize trees
    * call graphs are not trees -> must use alternative presentation (verticle panes?)
    * a single-class inheritance view could use the same rendering, though
    * call graphs seem out of scope for the time being
  * out of scope for this project, you could have one graph representation for both
    * there are two implicit directions: tree parent ~ caller ~ referencer ~ dependant, tree child ~ callee ~ referent ~ dependancy
* wait, should synos actually have IDs?
  * that is to say, should unique IDs be replaced with IDs based on the path from the root?
    * when a node is grafted, the editor can handle updating references
  * simplifies IDs and node ontology (as in identity, not structure)
  * but are there times when references need to be hard? say across package boundaries
* related to syno IDs, need more complex handling of different code sources
  * after recent clean up, syno maps are almost (flattened) strict trees
  * there's editable code (textual equivalent: current buffer = text from one file)
    * but I want navagable code to be a separate set of synos
      * because it seems so nice to have read-only, navagable versions of primitives, dependencies, dependants
        * am I over-focusing on how much I enjoyed navigating to NOR when it orignally happened accidentally?
* how to divise types:
  * reference assignment (name, value), reference invocation, maps/objects
* **?** choose AST format
  * current custom format is
    * directed/locally treelike
    * labeled edges ('relation')
    * labeled/typed nodes
    * ordered children (implicit)
    * actually a hypergraph because of child collections
      * child collections also ordered (explicit)
  * (see 'research notes')
  * still considering Unist
  * ANTLR?
  * throwing out a few lines...
* **?** diffing algorithm for syntree -> prestree transformation?
* **?** replace react with prestree -> rendering diffing algorithm more appropriate for AST manipulation?
  * first just profile it a bit

**documentation**

**longview**
* write JSON integration
* write integration for a real, in-use general-purpose programming language (Scheme?)
  * need bidirectional transformation between AST and text code (can use unist?)
* pick license
  * make sure contributors give up all copyright on offering contribution
* operationalize
* launch minimal viable project

**experimentation**
* try always-next-line + always-(class inheritance or call graph)-bidirectional-multipane?

**research**
* are structure editors maybe already common among blind programmers?
* what does vsc do to hot load extensions?
