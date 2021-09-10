* The [Language Server Protocol](https://github.com/microsoft/language-server-protocol) is clearly designed for *text* editors, but is a good role model. We can also piggyback on the actualy protocol, but need to hack in our commands by using the other
* I need an AST interface specifcation (currently custom)
  * maybe a custom one is fine? b/c it's so minimal it's easy to transform other formats
  * find one from a parser generator
    * [unist](https://github.com/syntax-tree/unist) (AST format) from uifiedjs
    * some more leads: https://tomassetti.me/parsing-in-javascript/
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
  * https://webia.lip6.fr/~phw//aGrUM/docs/last/doxygen/d5/dd1/using_graphs.html
  * [Toward an engineering discipline for GRAMMARWARE](https://www.cs.vu.nl/grammarware/agenda/paper.pdf)
* (incremental syntax specification) specifications
  * do they exist?
  * leads:
  * Forwarding in Attribute Grammars for Modular Language Design Eric Van Wyk1, Oege de Moor 1, Kevin Backhouse1, and Paul Kwiatkowski2
    * some of its citations (unobtained):
      * S. Adams. Modular Attribute Grammars for Programming Language Prototyping. Ph.D. thesis, University of Southampton, 1991. 128, 135
      * G. D. P. Dueck and G. V. Cormack. Modular attribute grammars. Computing Journal, 33:164–172, 1990. 128
      * R. Farrow, T. J. Marlowe, and D. M. Yellin. Composable attribute grammars: Support for modularity in translator design and implementation. In Proceedings of the ACM Symposium on Principles of Programming Languages, pages 223–234. ACM Press, 1992.
      * G. Hedin. An object-oriented notation for attribute grammars. In Proceedings of the European Conference on Object-Oriented Programming, ECOOP’89. Cam- bridge University Press, 1989.
      * C. Le Bellec, M. Jourdan, D. Parigot, and G. Roussel. Specification and imple-mentation of grammar coupling using attribute grammars. In M. Bruynooghe and J. Penjam, editors, Programming Language Implementation and Logic Programming (PLILP ’93), volume 714 of Lecture Notes in Computer Science, pages 123–136. Springer-Verlag, 1993.
      * U. Kastens and W. M. Waite. Modularity and reusability in attribute grammars. Acta Informatica, 31:601–627, 1994.
      * M. Mernik, M. Lenic, E. Avdicausevic, and V. Zumer. Multiple attribute grammar inheritance. Informatica, 24(3):319–328, 2000
      * Joao Saraiva and Doaitse Swierstra. Generic Attribute Grammars. In D. Parigot and M. Mernik, editors, Second Workshop on Attribute Grammars and their Applications, WAGA’99, pages 185–204, Amsterdam, The Netherlands, 1999. INRIA rocquencourt. 128
      * T. Teitelbaum and R. Chapman. Higher-order attribute grammars and editing environments. In ACM Sigplan ’90 Conference on Programming Languages Design and Implementation, pages 197–208, 1990.
      * H. Vogt, S. D. Swierstra, and M. F. Kuiper. Higher-order attribute grammars. In Conference on Programming Languages Design and Implementation, pages 131–145, 1990. Published as ACM SIGPLAN Notices, 24(7).
  * "Modular Grammars"?
* how to express language's AST structures (grammars)?
  * currently have custom version
  * is the grammar iself a good expression or too indirect?
    * someone argues that here
      * https://www.antlr3.org/pipermail/antlr-interest/2004-November/010165.html
    * example alternative
      * http://treedl.sourceforge.net/treedl/treedl_en.html#node.name
    * Backaus-Naur form for tree grammars
      * https://www.antlr2.org/doc/sor.html
* graph visualization (surveys)
  * https://drops.dagstuhl.de/opus/volltexte/2012/3748/pdf/13.pdf
  * http://papers.cumincad.org/data/works/att/b836.content.pdf
  * https://www.researchgate.net/profile/Hans-Joerg-Schulz/publication/274633015_A_Survey_of_Multi-faceted_Graph_Visualization/links/5523cb010cf2b351d9c33836/A-Survey-of-Multi-faceted-Graph-Visualization.pdf
  * file:///Users/lu/Downloads/cgf-dynamicgraphs.pdf
  * http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.150.5159&rep=rep1&type=pdf
* tree diffing
  * maybe:
      * https://ieeexplore.ieee.org/document/4656419?arnumber=4656419

why use formal mathematical notions to describe the visualization?
  not because we actually want to limit ourselves to such a strict system
    by formally enforcing it
    or making it the direct target of development
      we will require incidental auxility behavior
    that is to say, not because the mathematical system should line up precisely with implementation
  but because in doing so we implicitly define a visual language to the user
    that is to say, because the mathematical system should line up precisely with the user's mental model
      which defines what is actually import to describe mathematically: that which the user perceives
  this is why it's good to define, as an example, behavior of the graph around
    the edges of the screen
    the edges of the presentation graph


