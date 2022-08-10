import type { Syno } from '../../../types/syntactic/syno';
import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { SyntypeChildren } from '../../../types/grammar/syntype-children';
import type { UnindexedPresnoArgs } from '../../../types/presenter/presno-args/unindexed-presno-args';
import { UnindexedNonSynPresnoArgs } from '../../../types/presenter/presno-args/unindexed-non-syn-presno-args';
import { SynoRef } from '../../../types/syntactic/syno-ref';

const budRef = (parent): UnindexedNonSynPresnoArgs => {
  return {
    type: 'nonSynPresno',
    parentId: parent.id,
    nonSynoArgs: {
      valid: true,
      prestype: 'bud',
    },
  };
};

export default (
  syno: Syno,
  integration: MainsidePresentLangInt,
  // eslint-disable-next-line
): Record<string, (UnindexedPresnoArgs | UnindexedPresnoArgs[])> => {
  const childPresnoRefs: Record<string, (UnindexedPresnoArgs | UnindexedPresnoArgs[])> = {};

  const syntypeChildren: SyntypeChildren = integration.grammar[syno.syntype].children;

  for (const [childKey, childEntry] of Object.entries(syntypeChildren)) {
    if (!childEntry.collection) {
      if (syno[childKey] === null) {
        childPresnoRefs[childKey] = budRef(syno);
      // @ts-ignore: promised by grammar
      } else if (syno[childKey].relation === 'child') { // b/c key might also represent non-tree refs
        // @ts-ignore: promised by grammar
        childPresnoRefs[childKey] = {
          type: 'synPresno',
          synoId: (syno[childKey] as SynoRef).id,
        };
      }
    } else {
      const childCollection = syno[childKey] as SynoRef[]; // promised by grammar
      childPresnoRefs[childKey] = [];

      if (childCollection.length === 0) {
        // @ts-ignore: see "= []" above
        childPresnoRefs[childKey].push([budRef(syno)]);
      } else {
        for (const synoRef of childCollection) {
          if (synoRef.relation === 'child') { // b/c key might also represent non-tree refs
            // @ts-ignore: see "= []" above
            childPresnoRefs[childKey].push({
              type: 'synPresno',
              synoId: synoRef.id,
            });
          }
        }
      }
    }
  }

  return childPresnoRefs;
};
