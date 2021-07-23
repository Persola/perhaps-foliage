// @flow
import type { StateSelector } from '../state-selector';
import type { PresentLanguageIntegration } from '../language-integration/present-language-integration';
import type { MutablePresnoMap } from './mutable-presno-map';
import type { SynoId } from '../syno-id';
import type { Syno } from '../syno';
import type { Focus } from '../editor-state/focus';

export type PresentSyno = (
  StateSelector,
  PresentLanguageIntegration,
  MutablePresnoMap,
  ?SynoId,
  Syno,
  Object,
  ?Focus,
  PresentSyno,
) => SynoId
