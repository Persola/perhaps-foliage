import forChildSynoOf from '../../../syntree-utils/read-node/for-child-syno-of';
// import matchProductionRule from '../../../syntree-utils/match-production-rule';

import type { Syno } from '../../../types/syntactic/syno';
import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { Focus } from '../../../types/editor-state/focus';
import type { UnindexedNonSynPresnoArgs } from '../../../types/presenter/presno-args/unindexed-non-syn-presno-args';
import type { UnindexedPresnoArgs } from '../../../types/presenter/presno-args/unindexed-presno-args';
import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';
import type {
  LabledChildPresno,
  SynPresno,
} from '../../../types/presenter/presnos/presno';
import type { SynoRef } from '../../../types/syntactic/syno-ref';
// import type { ProductionRule } from '../../../types/grammar/production-rule';
import type { SynPresnoArgs } from '../../../types/presenter/presno-args/syn-presno-args';
// import type { ChildEdge } from '../../../types/syntactic/child-edge';
// import childSynos from '../../../syntree-utils/read-node/child-synos';

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

// const gapArgs = (
//   parent: Syno,
//   childSyntype: string,
// ): UnindexedNonSynPresnoArgs => {
//   return {
//     type: 'nonSynPresno',
//     parentId: parent.id,
//     nonSynoArgs: {
//       valid: true,
//       prestype: 'gap',
//       expectedSyntype: childSyntype,
//     },
//   };
// };

const synPresnoArgs = (synoRef: SynoRef): SynPresnoArgs => {
  return {
    type: 'synPresno',
    synoId: synoRef.id,
  };
};

export default (
  syno: Syno,
  integration: MainsidePresentLangInt,
  focus: Focus,
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

  // const grammarChildren: ProductionRule['rhs']['children'] = matchProductionRule(
  //   syno,
  //   integration.actualGrammar,
  // ).rhs.children;

  // TODO: based on edit distance match in matchProductionRule, use edits to add gaps and
  // label invalidities. Also maybe get non-terminal type back from matchProductionRule?
  let childSynoIndex = 0;
  // const childSynoRefs: SynoRef[] = [];
  // const childSynoEdges: ChildEdge[] = [];
  // forChildSynoOf(syno, (childSynoRef, edge) => {
  //   childSynoRefs.push(childSynoRef);
  //   childSynoEdges.push(edge);
  // });

  forChildSynoOf(syno, (synoRef, edge) => {
    if (
      syno.id === focus.synoId
      && childSynoIndex === focus.budIndex
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
      edgeLabel: edge.key,
      childRef: enstackForPresentation(
        childPresnoIndex,
        synPresnoArgs(synoRef),
      ),
    });

    childSynoIndex += 1;
    childPresnoIndex += 1;
  });

  if (
    syno.id === focus.synoId
    && childSynoIndex === focus.budIndex
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

  // for (const grammarChild of grammarChildren) {
  //   const { edgeLabel, childNonTerminal } = grammarChild;

  //   if (childSynoEdges[childSynoIndex]?.key === edgeLabel) {
  //     childPresnoRefs.push({
  //       edgeLabel,
  //       childRef: enstackForPresentation(
  //         childPresnoIndex,
  //         synPresnoArgs(childSynoRefs[childSynoIndex]),
  //       ),
  //     });

  //     childSynoIndex += 1;
  //   } else {
  //     const childSyntype = integration.actualGrammar.productionRules.find(rule => {
  //       return rule.lhs === childNonTerminal;
  //     }).rhs.parent;

  //     childPresnoRefs.push({
  //       edgeLabel,
  //       childRef: enstackForPresentation(
  //         childPresnoIndex,
  //         gapArgs(syno, childSyntype),
  //       ),
  //     });
  //   }

  //   childPresnoIndex += 1;
  // }

  // while (childSynoIndex < childSynoRefs.length) {
  //   const edgeLabel = childSynoEdges[childSynoIndex].key;

  //   childPresnoRefs.push({
  //     edgeLabel,
  //     childRef: enstackForPresentation(
  //       childPresnoIndex,
  //       synPresnoArgs(childSynoRefs[childSynoIndex]),
  //     ),
  //   });
  //   childSynoIndex += 1;
  //   childPresnoIndex += 1;
  // }

  return childPresnoRefs;
};
