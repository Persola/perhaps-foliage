Syntactic graphs represent code.
They have a tree structure.

In context, they are named through IDs, which can be used to point to the root node in each tree. Their nodes have paths communicated through a key or array of the keys, in order, used to access a given node starting with a reference to the root node. An empty array points to the root node.

Everything needed to execute a syntactic graph should be contained in the graph itself (in the root node or any child nodes) or should be referenced from a syntactic node reference (graph ID and path). Thus graphs can be incomplete because they have not resolved node references, but not for any other reason.
