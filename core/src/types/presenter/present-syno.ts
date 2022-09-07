import Syno from '../../main-process/syntactic-interface/newnew/readable/syno';

import type { StateSelector } from '../state-selector';
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
