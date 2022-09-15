import StateSelector from '../../main-process/state-interface/state-selector';
import Syno from '../../main-process/state-interface/syntactic-interface/readable/syno';

import type { MainsidePresentLangInt } from '../language-integration/interfaces/mainside/mainside-present-lang-int';
import type { MutablePresnoMap } from './presno-map/mutable-presno-map';
import type { Focus } from '../editor-state/focus';

export type PresentSyno = (
  stateSelector: StateSelector,
  LangInt: MainsidePresentLangInt,
  presnoMap: MutablePresnoMap,
  synoId: number | null,
  syno: Syno,
  focus: Focus | null,
  presentSyno: PresentSyno
) => number;
