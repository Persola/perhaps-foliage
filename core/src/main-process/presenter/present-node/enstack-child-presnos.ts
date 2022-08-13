import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';
import type { Syno } from '../../../types/syntactic/syno';
import type { PresnoRef } from '../../../types/presenter/presno-ref';
import type { SyntypeChildren } from '../../../types/grammar/syntype-children';
import type { SynoRef } from '../../../types/syntactic/syno-ref';
import type { SynPresnoArgs } from '../../../types/presenter/presno-args/syn-presno-args';
import type { UnindexedNonSynPresnoArgs } from '../../../types/presenter/presno-args/unindexed-non-syn-presno-args';
import type { UnindexedPresnoArgs } from '../../../types/presenter/presno-args/unindexed-presno-args';

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
  childPresnoArgs: { [index: string]: (UnindexedPresnoArgs | UnindexedPresnoArgs[]) },
  enstackForPresentation: EnstackForPresentation,
  // eslint-disable-next-line
): { [childPresnoAttrName: string]: (PresnoRef | PresnoRef[]) } => {
  const syntypeChildren: SyntypeChildren = integration.grammar[syno.syntype].children;

  const childRefs = {};
  let ind = 0;

  for (const [childKey, childArgs] of Object.entries(childPresnoArgs)) {
    childRefs[childKey] = enstackForPresentation(ind, childArgs as UnindexedNonSynPresnoArgs);
    ind += 1;
  }

  for (const [childKey, childEntry] of Object.entries(syntypeChildren)) {
    if (!childEntry.collection) {
      if (syno[childKey] === null) {
        childRefs[childKey] = enstackForPresentation(ind, budArgs(syno));
        ind += 1;
      // @ts-ignore: promised by grammar
      } else if (syno[childKey].relation === 'child') { // b/c key might also represent non-tree refs
        // @ts-ignore: promised by grammar
        childRefs[childKey] = enstackForPresentation(ind, synPresnoArgs(syno[childKey]));
        ind += 1;
      }
    } else {
      const childCollection = syno[childKey] as SynoRef[]; // promised by grammar
      childRefs[childKey] = [];

      if (childCollection.length === 0) {
        // @ts-ignore: see "= []" above
        childRefs[childKey].push(enstackForPresentation(ind, budArgs(syno)));
        ind += 1;
      } else if (childCollection.every(ref => ref.relation === 'child')) { // b/c key might also represent non-tree refs
        for (const synoRef of childCollection) {
          // @ts-ignore: see "= []" above
          childRefs[childKey].push(enstackForPresentation(ind, synPresnoArgs(synoRef)));
          ind += 1;
        }
      }
    }
  }

  return childRefs;
};
