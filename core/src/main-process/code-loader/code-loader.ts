import type { IngestedTree } from '../../types/code-loader/ingested-tree';
import type { RawSyntaxTree } from '../../types/syntactic/newnew/raw/raw-syntax-tree';
import type { SerializedSyno } from '../../types/syntactic/newnew/serialized-syno';

const readTree = (uningestedTree: SerializedSyno): IngestedTree => {
  const idIterator = (function* generateIterator(): Generator<number> {
    let nextId = 1;
    while (true) {
      yield nextId;
      nextId++;
    }
  }());

  const rawTree: RawSyntaxTree = {};
  const rootId: number = idIterator.next().value;

  rawTree[rootId] = {
    ...uningestedTree,
    id: rootId,
    rootwardEdgeLabel: null,
    parentId: null,
    childIds: [],
    intratreeRefs: {},
    intertreeRefs: {},
    attrs: {},
  };

  return {
    rawTree,
    inverseExtraTreeEdges: {},
    rootId,
  };
};

export default {
  fromSerializedTree: (
    serializedTree: SerializedSyno,
  ): IngestedTree => {
    const ingestedTree = readTree(serializedTree);
    console.warn('graph not validated');
    // validateGraph(
    //   'drug_in_file',
    //   newSyntree,
    //   integration.id,
    //   integration.actualGrammar,
    //   integration.primitives,
    // );
    return ingestedTree;
  },

  fromFileObject: async (
    file: File,
  ): Promise<IngestedTree> => {
    const fileText = await file.text();
    const newSyntree = JSON.parse(fileText);
    // validateGraph
    return newSyntree;
  },
};
