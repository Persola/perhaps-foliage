import type { StateSelector } from '../../../../types/state-selector';
import type { KeyToNewSynoAttrs } from '../../../../types/language-integration/key-to-new-syno-attrs';

export default (
  state: StateSelector,
  input: string,
  keyToNewSynoAttrs: KeyToNewSynoAttrs,
): void => {
  if (state.focusedSyno().parent) {
    const parent = state.getSyno(state.focusedSyno().parent.id);
    const newSynoType: string = keyToNewSynoAttrs[input].syntype;
    const grammar = state.grammar();

    const typesAllowedUnderParent: string[] = [];
    Object.values(grammar[parent.syntype].children).forEach(childEntry => {
      if (childEntry.syntype instanceof Array) {
        typesAllowedUnderParent.concat(childEntry.syntype);
      } else {
        typesAllowedUnderParent.push(childEntry.syntype);
      }
    });

    if (!typesAllowedUnderParent.includes(newSynoType)) {
      throw new TypeError(
        `Can't add syno of type '${newSynoType}' under parent of type '${parent.syntype}'`,
      );
    }
  }
};
