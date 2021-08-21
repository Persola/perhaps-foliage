* The [Language Server Protocol](https://github.com/microsoft/language-server-protocol) is clearly designed for *text* editors, but is a good role model. We can also piggyback on the actualy protocol, but need to hack in our commands by using the other
* parsing tools and parser generators -> universal AST interfce spec
  * [unist](https://github.com/syntax-tree/unist) (AST format) from uifiedjs
  * some more leads: https://tomassetti.me/parsing-in-javascript/
* [Toward an engineering discipline for GRAMMARWARE](https://www.cs.vu.nl/grammarware/agenda/paper.pdf)
* other structure editors
  * Andrew Blinn's Fructure has a very similar visual expression!
https://github.com/disconcision/fructure
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