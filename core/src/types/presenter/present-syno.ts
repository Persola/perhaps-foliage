import type { StateSelector } from '../state-selector';
import type { MainsidePresentLanguageIntegration } from '../language-integration/mainside-present-language-integration';
import type { MutablePresnoMap } from './mutable-presno-map';
import type { SynoId } from '../syntactic/syno-id';
import type { Syno } from '../syntactic/syno';
import type { Focus } from '../editor-state/focus';

export type PresentSyno = (
  stateSelector: StateSelector,
  languageIntegration: MainsidePresentLanguageIntegration,
  presnoMap: MutablePresnoMap,
  synoId: SynoId | null,
  syno: Syno,
  focus: Focus | null,
  presentSyno: PresentSyno
) => SynoId;
