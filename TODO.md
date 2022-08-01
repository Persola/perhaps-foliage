**currently**
* move integration load out of integration-load-input file

**next**
* some of the types are ridiculous, need to parameterize
  * e.g. _RendersideUninitializedPresentLanguageIntegration_

**testing**
* try rendering everything that should already be renderable

**bugs**
* when replacing node, remove its list of referents and its ID in other lists from the inverse references map

**maintenance**
* extract common logic from destroy syno and replace syno reducers as syntree utils
  * probably also rewrite replace to call extracted patterns of destroy + create?
    * no doing this is premature optimization
* extract base presenter
  * force synPresno per syno
  * force holes for necessary children
* renderer should derive child presno order straight from presno attrs
  * see LANGUAGE_INTEGRATION_SPEC
  * but keep rendererAttrs because there will need to be config later
    * e.g. what classes to apply for custom flags on presnos
* rename packages from `saliva-repl-*` format to something temporary?
  * because 'saliva' now clearly refers to the language
  * probably rename directory/repositories too, then
* adopt LSP
  * not very useful yet, but so the structure guides me
  * how the hell would I do this!? totally different design
    * but a server makes more sense for the ECMAscript parts of the integration
* some kind of plan for error catching
  * e.g., right now grammar and graph validation errors force reload
  * surface mainside errors and show on renderside
* language packages and core should be peer dependencies?
* break out packages
  * just keep monorepo for now
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
* **?** presentation tree should also have grammar
* presentation read tools
  * **?** pure functional derive from synstate
    * what?
  * **?** store/cache presentation
* **?** systematic method to generate IDs
* **?** use for child syno of in inverse reference map and destroy syno (combine with getChildpresnos?)
* **?** adopt some tree version of Backaus-Naur form for grammar? (move other info into new file)
  * What I really need is what children each type is allowed?
    * well, that's probably significantly less expressive, what's needed? what do contemporary ASTs tend like?
      * edNCE?
* **?** pres validation
  * mismatching IDs was painful bug in pre after specifically guarding against it in syn

**new functionality**
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
  * nope
    * presentational scope isn't syntactic scope
    * we should only support context-free grammars probably
    * but presenters need access to things even wider than ancestors
      * at least the entire editee graph should be accessible, e.g. function definition reference
* [_saliva_] make types synos (beneath default visiblity level)
* [_saliva_] wrap some features (e.g., named parameters) in language (e.g., always pass a map or list), see Nothing above

**design**
* data layer(s)
  * there's lots of interdependant state, so directly manipulating state in reducers doesn't work
    * compare to state selector--a layer on top the raw data
    * if we're adding a layer anyway we could store syntree data in an in-memory database or something DB-like?
      * or just _really_ flatten it completely in redux
        * like each property
    * just creating a bunch of utils and importing them everywhere -> interfile spaghetti structure
      * just use utils, but restrict imports with something like ignore-plugin or restrict-imports-loader
        * syntree read utils restricted in renderers, command dispatchers
        * syntree write utils only available in reducers (and other write utils)
      * or group them under stateSelector equivalent for mindfulness
    * could create a OO-ish layer on top
      * not objects with state, just wrappers on top of state
      * because I want e.g. `focusedSyno.parent`
        * that's alos achievable by direct reference between synos
          * but also e.g. `focusedSyno.nextSibling`
      * so is there `focusedSyno.raw()` or something?
        * property values would be given diretly
        * refs are followed automatically
        * sure, I guess
* **?** AST format stores all refs in one object, relation type is property of ref
  * allows language integrations to provide modular 'grammar's contributing relations
    * nah, this could be done the current way too
  * [_saliva_] make function call optionally non-tree instead of child (notably for primitives)
* should synos have IDs?
  * yes, for performance, at least in memory when editor is running
  * but should they exist in the AST format?
* handling different code sources
  * e.g. navigate into primitive
  * e.g. navigate into dependency
* AST format
  * current custom format is
    * directed/locally treelike
    * labeled edges ('relation')
    * labeled/typed nodes
    * ordered children (implicit)
    * child collection
      * could be considered hypergraph
      * but I consider each child a seperate relation, just stored together
      * the overall child order is {a: ref, b: [ref, ref], c: ref}.values().flatten()
  * unist?
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
          * sort of redundant with whatever read/write layer I have on top of raw data
  * ANTLR?
* **?** diffing algorithm for syntree -> prestree transformation?
* **?** replace react with prestree -> rendering diffing algorithm more appropriate for AST manipulation?
  * first just profile it a bit

**documentation**
* priority: language integration interface

**longview**
* write JSON integration
* write integration for a real, in-use general-purpose programming language (Scheme?)
  * need bidirectional transformation between AST and text code (can use unist?)
* pick license
  * make sure contributors give up all copyright on offering contribution
* operationalize
* launch minimal viable project
* veryifying valid syntax is renderable
  * formal?
  * fuzz based on grammar
* **?** use proxy-memoize or another selector memoizer
  * premature optimization for now

**experimentation**
* try always-next-line + always-(class inheritance or call graph)-bidirectional-multipane?

**research**
* are structure editors maybe already common among blind programmers?
* what does vsc do to hot load extensions?
