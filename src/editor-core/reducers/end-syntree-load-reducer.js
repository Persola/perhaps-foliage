// @flow
import deriveInverseReferenceMap from '../derive-inverse-reference-map';
import codeLoader from '../../code-loader/code-loader.js';
import createSynoFetcher from '../../syntree-utils/create-syno-fetcher.js';
import ascendToRoot from '../../syntree-utils/ascend-to-root.js';

import type { SynoMap } from '../../types/syno-map.js';
import type { EditorState } from '../../types/editor-state.js';
import type { EndAsyncSyntreeLoad } from '../../types/actions/end-syntree-load';

export default (
  oldState: EditorState,
  action: EndAsyncSyntreeLoad,
): EditorState => {
  const salivaPrimitives: SynoMap = codeLoader.loadSyntreeFromFileSystem('salivaPrimitives');
  const newSyntree: SynoMap = action.synoMap;
  const getSyno = createSynoFetcher(newSyntree);
  const rootSyno = ascendToRoot(Object.keys(newSyntree)[0], getSyno);
  const newSyntreeWithPrimitives = { ...newSyntree, ...salivaPrimitives };

  return {
    ...oldState,
    synoMap: newSyntreeWithPrimitives,
    inverseReferenceMap: deriveInverseReferenceMap(newSyntreeWithPrimitives),
    focus: {
      synoId: rootSyno.id,
      presnoIndex: false,
      charIndex: false,
    },
    resultSyntreeRootId: false,
    interpreting: false,
    resultOutdated: false,
    loadingSyntree: false,
  };
};
