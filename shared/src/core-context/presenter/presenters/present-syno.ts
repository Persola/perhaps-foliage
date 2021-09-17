import focuses from './focuses';

import type { SynoId } from '../../../types/syntactic/syno-id';
import type { StateSelector } from '../../../types/state-selector';
import type { Focus } from '../../../types/editor-state/focus';
import type { CoresidePresentLanguageIntegration } from '../../../types/language-integration/coreside-present-language-integration';
import type { Presno } from '../../../types/presenter/presno';
import type { PresentAndReturnRef } from '../../../types/presenter/present-and-return-ref';

export default (
  synoId: SynoId,
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  focus: Focus,
  presentAndReturnRef: PresentAndReturnRef,
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

  const presentation = presenter(
    syno,
    state,
    presentAndReturnRef,
  );

  const parent = (
    syno.parent === null
      ? null
      : {
        presnoRef: true,
        id: syno.parent.id,
      }
  );

  return {
    ...presentation,
    ...focuses(focus, syno.id),
    id: syno.id,
    parent,
    prestype: syno.syntype,
    valid: validator(syno, state),
  };
};
