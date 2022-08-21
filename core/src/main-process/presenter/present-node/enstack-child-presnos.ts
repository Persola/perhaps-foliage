import forChildSynoOf from '../../../syntree-utils/read-node/for-child-syno-of';
import matchProductionRule from '../../../syntree-utils/match-production-rule';

import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';
import type { Syno } from '../../../types/syntactic/syno';
import type {
  LabledChildPresno,
  SynPresno,
} from '../../../types/presenter/presnos/presno';
import type { SynoRef } from '../../../types/syntactic/syno-ref';
import type { UnindexedNonSynPresnoArgs } from '../../../types/presenter/presno-args/unindexed-non-syn-presno-args';
import type { UnindexedPresnoArgs } from '../../../types/presenter/presno-args/unindexed-presno-args';
import type { ProductionRule } from '../../../types/grammar/production-rule';
import type { SynPresnoArgs } from '../../../types/presenter/presno-args/syn-presno-args';

const budArgs = (parent): UnindexedNonSynPresnoArgs => {
  return {
    type: 'nonSynPresno',
    parentId: parent.id,
    nonSynoArgs: {
      valid: true,
      prestype: 'bud',
    },
  };
};

const synPresnoArgs = (synoRef: SynoRef): SynPresnoArgs => {
  return {
    type: 'synPresno',
    synoId: synoRef.id,
  };
};

export default (
  syno: Syno,
  integration: MainsidePresentLangInt,
  nonSynChildPresnoArgs: { [index: string]: (UnindexedPresnoArgs | UnindexedPresnoArgs[]) },
  enstackForPresentation: EnstackForPresentation,
  // eslint-disable-next-line
): SynPresno['children'] => {
  const childPresnoRefs: LabledChildPresno[] = [];
  let presnoChildIndex = 0;

  // push all non-syntactical presnos first
  for (const [childKey, childArgs] of Object.entries(nonSynChildPresnoArgs)) {
    childPresnoRefs.push({
      edgeLabel: childKey,
      childRef: enstackForPresentation(presnoChildIndex, childArgs as UnindexedNonSynPresnoArgs),
    });
    presnoChildIndex += 1;
  }

  const grammarChildren: ProductionRule['rhs']['children'] = matchProductionRule(
    syno,
    integration.actualGrammar,
  ).rhs.children;

  const childSynoRefs = [];
  const childSynoEdges = [];
  forChildSynoOf(syno, (childSynoRef, edge) => {
    const { key } = edge;
    childSynoRefs.push(childSynoRef);
    childSynoEdges.push(key);
  });

  let synoChildIndex = 0;

  for (const grammarChild of grammarChildren) {
    if (childSynoEdges[synoChildIndex] === grammarChild.edgeLabel) {
      childPresnoRefs.push({
        edgeLabel: grammarChild.edgeLabel,
        childRef: enstackForPresentation(
          presnoChildIndex,
          synPresnoArgs(childSynoRefs[synoChildIndex]),
        ),
      });

      synoChildIndex += 1;
    } else {
      childPresnoRefs.push({
        edgeLabel: grammarChild.edgeLabel,
        childRef: enstackForPresentation(
          presnoChildIndex,
          budArgs(syno),
        ),
      });
    }

    presnoChildIndex += 1;
  }

  while (synoChildIndex < childSynoRefs.length) {
    childPresnoRefs.push({
      edgeLabel: childSynoEdges[synoChildIndex],
      childRef: enstackForPresentation(
        presnoChildIndex,
        synPresnoArgs(childSynoRefs[synoChildIndex]),
      ),
    });
    synoChildIndex += 1;
    presnoChildIndex += 1;
  }

  return childPresnoRefs;
};
