import recursivelyDeserializeSubtree from './recursively-deserialize-subtree';
import nominalizeRefs from './nominalize-refs';

import type { RawSyntaxTree } from '../../../types/syntactic/newnew/raw/raw-syntax-tree';
import type { SerializedSyno } from '../../../types/syntactic/newnew/serialized-syno';
import type { SynoMapWithStructuralRefs } from '../../../types/code-loader/deserialization/syno-map-with-structural-refs';

const idIteratorGenerator = function* generateIterator(): Generator<string> {
  let nextId = 1;
  while (true) {
    yield String(nextId);
    nextId++;
  }
};

export default (serializedTree: SerializedSyno): RawSyntaxTree => {
  const idIterator = idIteratorGenerator();
  const synoMap: SynoMapWithStructuralRefs = {};

  const rootId = recursivelyDeserializeSubtree(
    serializedTree,
    null,
    null,
    [],
    synoMap,
    idIterator,
  );

  return nominalizeRefs({
    synoMap,
    rootId,
  });
};
