import type { StateSelector } from '../state-selector';
import type { CoresidePresentLanguageIntegration } from '../language-integration/coreside-present-language-integration';
import type { MutablePresnoMap } from './mutable-presno-map';
import type { SynoId } from '../syntactic/syno-id';
import type { Syno } from '../syntactic/syno';
import type { Focus } from '../editor-state/focus';

export type PresentSyno = (
  stateSelector: StateSelector,
  languageIntegration: CoresidePresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  synoId: SynoId | null,
  syno: Syno,
  scope: Record<string, unknown>,
  focus: Focus | null,
  presentSyno: PresentSyno
) => SynoId;
