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
  * gradual/modular typing/specification
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
  * (I'm aware of many but want to organize thoughts about them)
  * [MPS](https://www.jetbrains.com/help/mps/language-definition.html)