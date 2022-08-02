~~Syntactic graphs represent code. They have a tree structure.~~

~~Their nodes are called "syntactic nodes", abbreviated to "synos". Synos have IDs. Syntactic graphs may be referenced using the ID of their root syno. Nodes within a tree can be identified by the ID of the tree in conjunction with a path from that root to the child node expressed as a key or ordered array of the keys corresponding to the edges leading from the root to the intended node. An empty array points to the root node.~~

~~Everything needed to execute a _complete_ syntactic graph should be contained in the graph itself (in the root node and its children). However, a graph can be incomplete, and therefore unexecutable, iff it contains a reference to a subtree but does not have access to the referant.~~

~~In Perhaps Foliage, syntactic trees are expressed as maps between syno IDs and synos. Synos contain references to child and parent synos. You have to know the root syno ID to efficiently traverse the tree. Nodes removed from a tree should be removed from the map unless they are intended to be a new tree stored in the~~

~~In Perhaps Foliage, there is also the presentation tree, which contains presentation nodes ("presnos"). Each syno rendered in a given rendering will have a corresponding presno, but those not rendered will not. Presnos can also not correspond to a syno, but the root presno must. Presnos can be each others' parents. Ergo, the presnos corresponding to synos constitute a valid subtree (vocab? like starting at the same root but you can prune branches whereever, leaving a valid tree) of the presno tree.~~

Most of this becomes irrelevant with the switch to unist, but I'll need to expand on some it somewhere
