import type { StateSelector } from '../state-selector';
import type { MainsidePresentLangInt } from '../language-integration/interfaces/mainside/mainside-present-lang-int';
import type { MutablePresnoMap } from './presno-map/mutable-presno-map';
import type { SynoId } from '../syntactic/syno-id';
import type { Syno } from '../syntactic/syno';
import type { Focus } from '../editor-state/focus';

export type PresentSyno = (
  stateSelector: StateSelector,
  LangInt: MainsidePresentLangInt,
  presnoMap: MutablePresnoMap,
  synoId: SynoId | null,
  syno: Syno,
  focus: Focus | null,
  presentSyno: PresentSyno
) => SynoId;
