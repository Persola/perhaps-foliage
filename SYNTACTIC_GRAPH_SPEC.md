Syntactic graphs represent code. They have a tree structure.

Their nodes are called "syntactic nodes" or "synos". Synos have IDs. Syntactic graphs are identified (in part?) by their root syno's ID. Nodes within a graph/tree can be identified by the ID of the tree in conjunction with a path from that root to the child node expressed as a key or ordered array of the keys. An empty array points to the root node.

Everything needed to execute a complete syntactic graph should be contained in the graph itself (in the root nodes and their children). However, a graph can be incomplete, and therefore unexecutable, iff it contains a reference to a subtree but does not have access to the referant.

In Saliva REPL, syntactic trees are expressed as maps between syno IDs and synos. Synos contain references to child and parent synos. You have to know the root syno ID to efficiently traverse the tree. There is also the presentation tree, which has the same structure but represents code as it is being presented to a user. ("presno" := "presenation node".)
