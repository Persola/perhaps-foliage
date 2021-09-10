import type { StateSelector } from '../../../types/state-selector';
import type { Syno } from '../../../types/syntactic/syno';
import type { SynoId } from '../../../types/syntactic/syno-id';
import type { Presno } from '../../../types/presenter/presno';
import type { MutablePresnoMap } from '../../../types/presenter/mutable-presno-map';
import type { PresentSyno } from '../../../types/presenter/present-syno';
import type { Focus } from '../../../types/editor-state/focus';
import type { CoresidePresentLanguageIntegration } from '../../../types/language-integration/coreside-present-language-integration';

import focuses from './focuses';

export default (
  state: StateSelector,
  integration: CoresidePresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  parentId: SynoId | null,
  syno: Syno,
  scope: Record<string, unknown>,
  focus: Focus | null,
  presentSyno: PresentSyno,
): SynoId => {
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

  const valid = validator(syno, state);

  const presentationAttrs = presenter(
    state,
    integration,
    presnoMap,
    syno,
    scope,
    focus,
    presentSyno,
  );

  const parent = !parentId
    ? null
    : {
      presnoRef: true,
      id: parentId,
    };

  const { focused, presnoFocused, charFocused } = focuses(focus, syno.id);

  const presentation: Presno = {
    ...presentationAttrs,
    synoId: syno.id,
    parent,
    valid,
    focused,
    presnoFocused,
    charFocused,
  };

  if (typeof presnoMap[presentation.synoId] !== 'undefined') {
    throw new Error('attempted to overwrite presno!');
  }

  presnoMap[presentation.synoId] = presentation;
  return presentation.synoId;
};
