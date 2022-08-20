* it's not a structure editor
  * because at this point I'm pretty commited to allowing mutations that disobey the grammar
  * and instead just:
    * showing them as invalid
    * (or) only allowing them before an action is commited (generally: until key up)
  * I guess it's still a structure editor for _trees_
    * but not for the grammar
* should I be formalizing tree edits according to tree rewriting stuff?
  * probably not necessary but maybe I should do some reading
  * to make sure I have a reasonably compatible set of transformations
  * trees _must_ be closed under edits
  * edits could also guide the user towards obeying the grammar
    * but maybe this should be strictly integrationland
    * user's ability to mutate fluidly vs. editor's grammar-awareness
* solving the N x M problem
  * i.e., combinatorial complexity between languages and development environments
  * Microsoft's [Language Server Protocol](https://github.com/microsoft/language-server-protocol) does a good job of solving this problem for current editors/languages
    * but it's designed specifically for two kinds of documents: text documents and notebooks
      * so most of the individual methods don't do anything for this project
      * but some messages are still releveant, like the lifecycle ones
      * also there is room in the protocol for arbitrary messages, so the other types could be hacked in for now
      * how do they compare now?
        * LSP-only: everything specific to textDocument and notebook types
        * the crossover now: ?
        * parts of the integration this editor needs (are these in LSP?):
          * grammar (for node type checking, suggestions)
          * primitives
          * keyToNewSynoAttrs, so like key bindings per node type
          * not the interpret function--only relevant to REPL version?
          * synoValidators
          * visual things that definately aren't in the LSP:
            * presenters
            * renderers
            * styles (anything similar though?)
    * the relationship between this project and the LSP could be:
      * just generally taking inspiration from it
      * partially conforming to the specification but not strictly
        * probably with the hope of conforming to it later
          * perhaps imagining a hypothetical version of the LSP that does more for this kind of editor (client)
        * this work could start now
      * using the LSP and hacking in the other method types I need where they will fit
        * in which case intregation should ideally not be delayed too long
        * would need to use in editor core: https://www.npmjs.com/package/vscode-languageclient
        * would need to use in language integrations: https://www.npmjs.com/package/vscode-languageserver
* I need a multi-language AST format/specification (currently custom)
  * maybe a custom one is fine? b/c it's so minimal it's easy to transform other formats
  * find one from a parser generator
    * [unist](https://github.com/syntax-tree/unist) (AST format) from uifiedjs
    * [ANTLR's AST interface](https://www.antlr2.org/javadoc/antlr/collections/AST.html)
      * http://www.springframework.net/docs/1.3.0-RC1/api/net-2.0/html/Spring.Core~Spring.Expressions.Parser.antlr.collections.AST.html
      * **?** https://github.com/datacamp/antlr-ast
      * ANTLR tree PARSER interface:
        * https://www.antlr2.org/doc/sor.html
    * Babelfish's UAST (dead)
    * Jison seems dead
    * GDK focused on Cobol family (probably too narrow)
    * UniCC
      * produces some kind of parse tree
      * also has 'Abstract Syntax Tree Notations' (see manual) which construct ASTs, but in beta so probably not
    * waxeye outputs parse trees as strings
      * format appears to be
        * newlines and intentation for nesting
        * "->" for non-leaf children, "|" for leaf children
    * OMeta seems like it probably has no format?
    * tree sitter
      * https://tree-sitter.github.io/tree-sitter/using-parsers#syntax-nodes
      * https://github.com/tree-sitter/tree-sitter/blob/aea35461b1c5c1d47615759080aac1168ce03ec0/lib/include/tree_sitter/api.h
    * not language independant (JS) but kind of cool https://github.com/benjamn/ast-types
    * some more leads: https://tomassetti.me/parsing-in-javascript/
  * modular typing/specification
    * cue or similar math?
    * [Gradual Typing (Siek & Taha)](http://scheme2006.cs.uchicago.edu/13-siek.pdf)
  * https://webia.lip6.fr/~phw//aGrUM/docs/last/doxygen/d5/dd1/using_graphs.html
  * [Toward an engineering discipline for GRAMMARWARE](https://www.cs.vu.nl/grammarware/agenda/paper.pdf)
  * https://stackoverflow.com/questions/556085/standard-format-for-concrete-and-abstract-syntax-trees
    * https://userpages.uni-koblenz.de/~ist/GXL/index.php
    * https://www.omg.org/spec/ASTM/1.0/Beta1/
* (incremental syntax specification) specifications
  * maybe I don't even know what I mean by this, but I'm imagining layers of subspecifications which put increasingly strict rules on data validity arranged in a tree structure so people can had specificity later
    * for example languages would be subspecs to the generalized AST format
  * not clearly important
  * leads:
    * Forwarding in Attribute Grammars for Modular Language Design Eric Van Wyk1, Oege de Moor 1, Kevin Backhouse1, and Paul Kwiatkowski2
      * check out its citations
    * "Modular Grammars"?
* how to express grammars?
  * currently have custom version
  * Backaus-Naur form is standard in other contexts
    * could just use BNF?
      * it expresses which text sequences are valid, but I care about the trees
      * sequences and trees aren't 1-to-1, so seems messy
    * could use a version of BNF for trees instead of sequences?
      * wtf is this link, is it related? https://www.antlr2.org/doc/sor.html
  * are formal grammars (strictly speaking)actually good expressions or too indirect?
    * someone argues that here
      * https://www.antlr3.org/pipermail/antlr-interest/2004-November/010165.html
    * example alternative
      * http://treedl.sourceforge.net/treedl/treedl_en.html#node.name
  * it should be a regular tree grammar
    * every context-free sequence grammar can be expressed as a regular tree grammar
      * so regular tree grammars are correct for handling my target class of languages, which are context-free languages when expressed as text
      * but also we could just use context free textual grammars
      * but the entire point of this project is to express documents as tree structures,
      so my little heart just can't bear representing them using what feels like a non-native form
      * most programmer know nothing to little about sequence grammars anyway, so for the target audience of language implementers I'm not sure it matters too much
    * they should be in normal form
      * so each production rule either:
        * N → t
        * (or) N → t[N₁...Nₙ] (Nₙ may = N)
      * but I should allow Nₙ → Nₙ in the future
        * Cleophas calls these U₊
        * grammars will likely be too verbose without
        * allows language implementers to specify syntactic subtypes, which we may want to use directly in the editor?
      * also consider allowing terminals as leaf children of RHS
        * but multiple levels of children in one production rule should be disallowed
        * Cleophas's Z₊ allows both of those
      * add ORs/unions later
    * but how to deal with an arbitrary number of children?
      * e.g. a function can have an arbitrary number of arguments
      * this is impossible under the formal descriptions of tree grammars I've seen
        * ranked alphabets assign a finite number of ranks to each symbol (~ syntype)
        * and likewise there are a finite number of production rules
      * not immediate problem because Saliva functions are binary
* graph visualization 
  * my visualization is "space nested" (as opposed to e.g. node-and-wire)
  * surveys:
    * https://drops.dagstuhl.de/opus/volltexte/2012/3748/pdf/13.pdf
    * http://papers.cumincad.org/data/works/att/b836.content.pdf
    * https://www.researchgate.net/profile/Hans-Joerg-Schulz/publication/274633015_A_Survey_of_Multi-faceted_Graph_Visualization/links/5523cb010cf2b351d9c33836/A-Survey-of-Multi-faceted-Graph-Visualization.pdf
    * file:///Users/lu/Downloads/cgf-dynamicgraphs.pdf
    * http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.150.5159&rep=rep1&type=pdf
* tree diffing
  * maybe:
      * https://ieeexplore.ieee.org/document/4656419?arnumber=4656419
* related projects
  * non-textual arbitrary language editors
    * [MPS](https://www.jetbrains.com/help/mps/language-definition.html)
  * projection editors
    * paredit
  * tree editors
    * https://jaredforsyth.com/treed/
  * Unison does the hashing dependencies thing
    * develop integration for unison to try color hash visualization?
* Saliva being original motivation for Perhaps Foliage
  * the "arguments interspersed with functional names" thing might seem particular
  * but could it not free code from a needlessly verbose Polish notation?
    * that is, current code uses Polish notation in that ordering
    * but your symbols are made of multiple text characters, so we need to define boundaries between them
    * which we do for some reason with both whitespace in general, but then also with parens and commas for function calls
    * some prefer true Polish notation, figuring it elimnates the redundancy
    * but instead, to make languages more expressive, perhaps we should be embracing arbitrary ordering
      * to make that work (note we have >2-ary functions), we need to have all these parens or whatever--very verbose
      * which is why all that structure needs to be built into the editor, as basic part of both expression and manipulation, clear but not overpowering
  * this is all just a form of recognizing trees as the true structure of code
    * but in fact code is in many way ahead of mathematical notation and such
      * at least we indent! those barbarians just have a bunch of implicit order of operations rules for every subfield!
      * (I often feel linear mathematical notation is better thought of as trees first, and flattening it is backwards premodern practice)
    * maybe I should pay some attention to structuring even natural language text this way
      * speaking and listening are natural, but reading/writing need an update ;>
      * lines up with ideas I've had about how I would like to structure texts
        * like books, maybe not most novels but like educational texts, would often be better organized so the reader can skip aroud appropriately based on what they already know and don't need to review, or what they want to dig further into
        * the dream of a book-length argument condensed to a single sentence, that can be piecemeal expanded into its full length based on whether you aleady agree with certain lemmas
      * could I write the documentation in this style?
        * very self-indulgent
        * but eating its own dog food?
        * kind of an excuse to make people learn interface?
      * hypertext is cool, but ignoring the specific substring that links out, it's kind fo just arbirary graphs, little structure
        * on the web the closest we've come to tree is fragment identifiers
* tree stuff
  * Cleophas, L. G. W. A., & Hemerik, C. (2009). Taxonomies of regular tree algorithms. In J. Holub, & J. Zdarek (Eds.), Proceedings of the Prague Stringology Conference 200 (PSC'09, Prague, Czech Republic, August 31-September 2, 2009) (pp. 146-159). Czech Technical University in Prague.
  * http://alexandria.tue.nl/extra2/200810270.pdf
  * BOTTOM-UP TREE ACCEPTORS C. HEMERIK and J.P. KATOEN
* syno IDs
  * presumably getting rids of syno IDs as-is
  * I think replaced by paths, but that brings up idenitity issues
  * will need to add content addressing (hash subsyntrees)
    * but that can only serve for certain purposes b/c it changes
    * the limitations applied by focus might make it more generally useful?
