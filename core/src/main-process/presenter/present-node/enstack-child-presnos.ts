import Syno from '../../state-interface/syntactic-interface/readable/syno';

import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { Focus } from '../../../types/editor-state/focus';
import type { UnindexedNonSynPresnoArgs } from '../../../types/presenter/presno-args/unindexed-non-syn-presno-args';
import type { UnindexedPresnoArgs } from '../../../types/presenter/presno-args/unindexed-presno-args';
import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';
import type {
  LabledChildPresno,
  SynPresno,
} from '../../../types/presenter/presnos/presno';
import type { SynPresnoArgs } from '../../../types/presenter/presno-args/syn-presno-args';

const budArgs = (
  parent: Syno,
): UnindexedNonSynPresnoArgs => {
  return {
    type: 'nonSynPresno',
    parentId: parent.id,
    nonSynoArgs: {
      valid: true,
      focused: true,
      prestype: 'bud',
    },
  };
};

const synPresnoArgs = (syno: Syno): SynPresnoArgs => {
  return {
    type: 'synPresno',
    synoId: syno.id,
  };
};

export default (
  syno: Syno,
  integration: MainsidePresentLangInt,
  focus: Focus | null,
  childPresnoArgsFromIntegration: {
    [index: string]: (UnindexedPresnoArgs | UnindexedPresnoArgs[])
  },
  enstackForPresentation: EnstackForPresentation,
  // eslint-disable-next-line
): SynPresno['children'] => {
  const childPresnoRefs: LabledChildPresno[] = [];
  let childPresnoIndex = 0;

  // first push all presnos from integration
  for (const [childKey, childArgs] of Object.entries(childPresnoArgsFromIntegration)) {
    childPresnoRefs.push({
      edgeLabel: childKey,
      childRef: enstackForPresentation(childPresnoIndex, childArgs as UnindexedNonSynPresnoArgs),
    });
    childPresnoIndex += 1;
  }

  syno.children().forEach((childSyno: Syno, childSynoIndex: number) => {
    if (
      syno.id === focus?.synoId
      && childSynoIndex === focus?.budIndex
    ) {
      childPresnoRefs.push({
        edgeLabel: 'bud',
        childRef: enstackForPresentation(
          childPresnoIndex,
          budArgs(syno),
        ),
      });

      childSynoIndex += 1;
      childPresnoIndex += 1;
    }

    childPresnoRefs.push({
      edgeLabel: childSyno.rootwardEdgeLabel,
      childRef: enstackForPresentation(
        childPresnoIndex,
        synPresnoArgs(childSyno),
      ),
    });

    childSynoIndex += 1;
    childPresnoIndex += 1;
  });

  if (
    syno.id === focus?.synoId
    && focus?.budIndex === syno.childIds.length
  ) {
    childPresnoRefs.push({
      edgeLabel: 'bud',
      childRef: enstackForPresentation(
        childPresnoIndex,
        budArgs(syno),
      ),
    });

    childPresnoIndex += 1;
  }

  return childPresnoRefs;
};
