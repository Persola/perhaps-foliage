import type { SynoId } from '../../../types/syntactic/syno-id';
import type { StateSelector } from '../../../types/state-selector';
import type { Focus } from '../../../types/editor-state/focus';
import type { CoresidePresentLanguageIntegration } from '../../../types/language-integration/coreside-present-language-integration';
import type { Presno } from '../../../types/presenter/presno';

import focuses from './focuses';

export default (
  synoId: SynoId,
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  focus: Focus,
): Presno => {
  const syno = state.getSyno(synoId);

  const presenter = integration.presenters[syno.syntype];
  if (!(presenter instanceof Function)) {
    throw new Error(
      `Language integration missing presenter for syntype '${syno.syntype}'`,
    );
  }

  const validator = integration.synoValidators[syno.syntype];
  if (!(validator instanceof Function)) {
    throw new Error(
      `Language integration missing validator for syntype '${syno.syntype}'`,
    );
  }

  return {
    ...presenter(
      syno,
      state,
      integration,
    ),
    ...focuses(focus, syno.id),
    synoId: syno.id,
    syntype: syno.syntype,
    valid: validator(syno, state),
    parent: (
      syno.parent === null
        ? null
        : {
          presnoRef: true,
          id: syno.parent.id,
        }
    ),
  };
};
