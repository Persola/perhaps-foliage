Here's how URIs identifying ASTs and their nodes are used in the project:

e.g. `foli://editor-instance.integrations.saliva.0.0.15.primitives/nor/arg-1`

**Full URIs**
* scheme: `foli`
* authority
  * I'm just trying to choose something reasonable to start
    * so we use it to represent the source from which some AST has been obtained, which for now is just whatever's loaded in the editor
      ```
      "In other cases, the data within the
      host component identifies a registered name that has nothing to do
      with an Internet host.  We use the name "host" for the ABNF rule
      because that is its most common purpose, not its only purpose."
      
      - rfc3986, section-3.2.2
      ```
  * we just use the host
  * `editor-instance` means "whatever's loaded in this editor instance (running program)"
  * `integrations` means "from the language integrations loaded in the editor"
  * then the name of the integration
  * then the version of that integration, split into its subcomponents (?)
  * then the root of a syntax tree, as identified by some name (`primitives`)
* the path and all of its parents, including the root, refer to a node/subtree in a syntax tree
* fragment identifiers could be used for node attributes?

There are also relative URIs for intratree references.
