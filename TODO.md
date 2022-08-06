**next**
* editing
  * add holes for required children
    * appear whenever a required child is missing
      * should be two places, both for saliva:
        * arguments without values
        * function defitions without bodies
    * just the circle
    * correct color for child edge
    * is presno (can be focused)

**testing**
* try rendering everything that should already be renderable

**bugs**
* trying to navigate past second argument to NOR call -> error and bad state
  * probably because of unavagable NOR body
    * which shouldn't be displayed anyway...

**maintenance**
* focus should only need presnoId now?
* extract base presenter
  * ensures:
    * one synpresno per presented syno
    * all and only children rendered as synpresnos
    * synpresno child order
  * but integration presenters need to be able to intersperse other presnos
  * renderer derives child order directly from ECMAscript object attr order?
    * but keep rendererAttrs because there will be need for config later
      * e.g. what classes to apply for custom flags on presnos
    * see LANGUAGE_INTEGRATION_SPEC
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
    * no, syntypes will have to be grouped in at least one layer
      * not doing this requires you to either:
        * have long lists of acceptable child types in many places
        * (or) have wrapper types that themselves have long lists
          * also unacceptable because we don't want to dictate syntactic structure like that
    * edNCE?
* **?** pres validation
  * mismatching IDs was painful bug in pre after specifically guarding against it in syn

**new functionality**
* VSCode extension
  * implement undo/redo
  * reversion or whatever else is left
* editing
  * add holes for required children
    * appear whenever a required child is missing
      * should be two places, both for saliva:
        * arguments without values
        * function defitions without bodies
    * just the circle
    * correct color for child edge
    * is presno (can be focused)
    * next step: command(s) to fill them
  * add buds
    * they form holes (related to syno deletion)
    * they can be placed and moved arbitarily to create synos
      * they could autocomplete come info based on context
      * place: direction from current syno (held) + [space OR insert]
        * on release: focused on bud
        * [space OR insert alone] -> replace current with bud
        * wait, in lieu of space/insert... all letters to immediate autocomplete?
          * but then can't use them for directions
        * and so arrows don't navigate until keyup
        * consider other key holding and ordering patterns
          * sequence of directions could be used for separating the cursor from the focused syno
            * if you want to keep your view while doing something e.g. selecting
            * so some uncommon option key to combo?
      * **?** switch between on and between nodes ('insert mode')--or should that be done through navigation as currently?
        * can we do without given the shift? I don't think so, b/c copy/paste needs to be in between nodes
          * can holes be used for what insert mode would be?
* navigation
  * enter eigensyno
  * alt keys:
    * binary seek [command/whatever key]
    * select set (focus nudges boundary to include focused node) [shift key]
    * move/shift/reorder selected nodes [option key]
      * e.g. move up/down in list
      * group selected nodes?
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
* **?** reachitecturing presentation
  * currently a big pure function between application state and react input
    * runs every update
  * diffing algorithm for syntree -> prestree transformation?
    * has same problem with prestree -> UI with one layer change at the top
  * store prestree in a store?
    * in the sam redux instance
      * weird to have part of app state from pure function taking another part
      * do it with middleware?
    * a new store
      * just caching on top of redux?
      * an independant store only helps avoid rerendering code view during other behavior
* **?** replace react with prestree -> rendering diffing algorithm more appropriate for AST manipulation?
  * notably, navigation in and out constantly changes component tree representing code
    * we're constantly losing or gaining one layer at the root
    * is there a way to deal with that in react? seems like an assumption of reconciliation
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
