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
import type { ChildEdge } from '../../../types/syntactic/child-edge';

const budArgs = (
  parent: Syno,
  childSyntype: string,
): UnindexedNonSynPresnoArgs => {
  return {
    type: 'nonSynPresno',
    parentId: parent.id,
    nonSynoArgs: {
      valid: true,
      prestype: 'bud',
      expectedSyntype: childSyntype,
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

  const grammarChildren: ProductionRule['rhs']['children'] = matchProductionRule(
    syno,
    integration.actualGrammar,
  ).rhs.children;

  // TODO: based on edit distance match in matchProductionRule, use edits to add buds and
  // label invalidities. Also maybe get non-terminal type back from matchProductionRule?
  let childSynoIndex = 0;
  const childSynoRefs: SynoRef[] = [];
  const childSynoEdges: ChildEdge[] = [];
  forChildSynoOf(syno, (childSynoRef, edge) => {
    childSynoRefs.push(childSynoRef);
    childSynoEdges.push(edge);
  });

  for (const grammarChild of grammarChildren) {
    const { edgeLabel, childNonTerminal } = grammarChild;

    if (childSynoEdges[childSynoIndex]?.key === edgeLabel) {
      childPresnoRefs.push({
        edgeLabel,
        childRef: enstackForPresentation(
          childPresnoIndex,
          synPresnoArgs(childSynoRefs[childSynoIndex]),
        ),
      });

      childSynoIndex += 1;
    } else {
      const childSyntype = integration.actualGrammar.productionRules.find(rule => {
        return rule.lhs === childNonTerminal;
      }).rhs.parent;

      childPresnoRefs.push({
        edgeLabel,
        childRef: enstackForPresentation(
          childPresnoIndex,
          budArgs(syno, childSyntype),
        ),
      });
    }

    childPresnoIndex += 1;
  }

  while (childSynoIndex < childSynoRefs.length) {
    const edgeLabel = childSynoEdges[childSynoIndex].key;

    childPresnoRefs.push({
      edgeLabel,
      childRef: enstackForPresentation(
        childPresnoIndex,
        synPresnoArgs(childSynoRefs[childSynoIndex]),
      ),
    });
    childSynoIndex += 1;
    childPresnoIndex += 1;
  }

  return childPresnoRefs;
};
