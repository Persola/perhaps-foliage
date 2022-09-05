import deserializeTree from './deserializer/deserialize-tree';

import type { SerializedSyno } from '../../types/syntactic/newnew/serialized-syno';
import type { RawSyntaxTree } from '../../types/syntactic/newnew/raw/raw-syntax-tree';

export default {
  fromSerializedTree: (
    serializedTree: SerializedSyno,
  ): RawSyntaxTree => {
    const ingestedTree = deserializeTree(serializedTree);
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
  ): Promise<RawSyntaxTree> => {
    const fileText = await file.text();
    const newSyntree = JSON.parse(fileText);
    // validateGraph
    return newSyntree;
  },
};
