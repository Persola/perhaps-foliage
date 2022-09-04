##Glossary

「**code view**」 a GUI pane displaying expressions in a programming language. The editor has one for editing (`stage`) and one for displaying interpretation results (`result`) that come back from the Saliva interpreter

「**syntree** || **tree**」 a syntax tree; an AST or other data tree, usually the thing being edited
* *syntrees are composed of a set of nodes and a set of edges, in the style trees are typically defined*


「**syno**」 a syntactical node; a node in the node set of a *syntree*

「**tree edge**」an edge in the edge set of a *syntree*

「**extratree edge**」 an edge between *synos*, each of which are in the node set of some *syntree*, but which itself is not in the edge set of the *synos'* *syntree*(*s*); an additional edge defined on top of *syntrees*

「**intratree edge**」 an edge between two *synos* in the same *syntree* (can be either a *tree edge* or an *extratree edge*)

「**intertree edge**」 an edge between two *synos* in the two different *syntrees* (always an *extretree edge*)

「**presentation**」 a graph representing the data from the syntree being edited that is presented to the user through the user interface at a given moment
* *presentation graphs can be trees or not, but they are locally similar to trees*

「**presno**」 a node in the presentation; something which can be focused on in the user interface.

All *presnos* are either a「**syntactical presno**」, which represent a *syno*, or a 「**non-syntactical presno**」, which does not. Every syno represented in the presentation (not necessarily all synos in the syntree) has a corresponding *syntactical presno* in that presentation.

In a user's inspection of the *syntree*, there is always one  「**focused presno**」

「**focus**」 Much like focus in a text document, the singular part of the document the user is "in" a the moment

「**navigate**」 Moving the focus through the presentation

「**grammar**」 A formal grammar, but within this project specifically an abstract regular tree grammar recognizing a language of abstract syntax trees
  * *Readers may be more familiar with string grammars than tree grammars. For any context-free string grammar, there exists a regular tree grammar which recognizes trees whose yields are recognized by that string grammar. So this project's grammars are also roughly equivalent to context-free string grammars—but note it's not one-to-one.*

#### not really used yet

「**scion**」 a root of a partial syntax subtree (analogy from horticultural grafting)

「[**root**]**stock**」 a syno onto which a scion is grafted

### Brainstorming the project name
Project name undetermined. For now, I'm using "Perhaps Foliage", because *perhaps* the project will ultimately be named "Foliage". It's a explicitly provisional name that contains its own default.

  * balloon twisting/balloon modeling
    * something related to "twist"
    * something related to "tie" or "ty", etc.
      * if "tier" is the user...
    * no one knows these terms, they just know what a "balloon animal" is
  * pill analogy
      * something related to "pill"
      * something related to "gelcap"
  * tree stuff
    * colorful trees
      * Eucalyptus deglupta
      * chlorophyll/autumn/**foliage**
    * something related to "pulp"
      * b/c it's a replacement for text/paper
    * animals related to trees
      * tree dwellers (insects inside?), tree eaters, nests made in trees from parts of trees, arboreal locamotion, sense perception specialized to arboreal environments, etc.
        * insects that bore and nest inside tree limbs?
          * seems like most only bore during larval stage--bad look
          * Buprestidae is flashy
      * arboreal locamotion
        * the tree pangolin
        * brachiation
          * a brachiator? (gibbons, siamangs)
            *  also a trichromat?
              * gibbons [1]
            * "gibbon" taken by open source edu project
            * there are some cool looking species, but names are iffy
            * "**ulna**"
              * because the freeing of the ulna was important for the development of brachiation [2]
              * Latin for "elbow"
              * not memorable enough?
              * shit, it's really close to "Luna"
                * cool, Luna already changed their name to "Enso" lol
            * silhouette of a gibbon during the flight phase of ricochetal brachiation
            * just "gib"?
            * other interpretations of brachiation?
              * "swing"
              * "lope"
              * "reach"
              * "armstep"
              * "armwalker"
              * "hometree" or "treehome" or "treenest"
  * if I pick something totally non-analagous, what do I want?
    * obviously homologous variants
      * project name
      * prefix form
        * one syllable
        * maximum three letters, prefereably two
      * lower priority
        * verb
        * adjective
        * word for user(s)/community
    * evokes visual
    * relatively easy for speakers of many languages
    * phonetic spelling
    * spellable pronunciation
    * simple spelling/pronunciation

[1] Deegan JF, Jacobs GH. 2001. Spectral sensitivity of gibbons: implications for photopigments and color vision. Folia Primatologica 72:26-29.

[2] Pennock, Emma ET, "From Gibbons to Gymnasts: A Look at the Biomechanics and Neurophysiology of Brachiation in Gibbons and its Human Rediscovery" (2013). Student Works. 2.
