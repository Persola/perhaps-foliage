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
  let ind = 0;

  for (const [childKey, childArgs] of Object.entries(nonSynChildPresnoArgs)) {
    childPresnoRefs.push({
      edgeLabel: childKey,
      childRef: enstackForPresentation(ind, childArgs as UnindexedNonSynPresnoArgs),
    });
    ind += 1;
  }

  forChildSynoOf(syno, (childSynoRef, edge) => {
    const { key } = edge;
    childPresnoRefs.push({
      edgeLabel: key,
      childRef: enstackForPresentation(ind, synPresnoArgs(childSynoRef)),
    });
    ind += 1;
  });

  const grammarChildren: ProductionRule['rhs']['children'] = matchProductionRule(
    syno,
    integration.actualGrammar,
  ).rhs.children;

  const grammarChildEdgeLabels = new Set(grammarChildren.map(child => child.edgeLabel));

  for (const grammarEdgeLabel of grammarChildEdgeLabels) {
    const matchingGrammarChildren = grammarChildren.filter(child => {
      return child.edgeLabel === grammarEdgeLabel;
    });
    const matchingRefs = childPresnoRefs.filter(ref => {
      return ref.edgeLabel === grammarEdgeLabel;
    });
    if (matchingRefs.length < matchingGrammarChildren.length) {
      childPresnoRefs.push({
        edgeLabel: grammarEdgeLabel,
        childRef: enstackForPresentation(ind, budArgs(syno)),
      });
      ind += 1;
    }
  }

  return childPresnoRefs;
};
