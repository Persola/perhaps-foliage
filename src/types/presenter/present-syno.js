// @flow
import type { StateSelector } from '../state-selector';
import type { LanguageIntegration } from '../language-integration';
import type { MutablePresnoMap } from './mutable-presno-map';
import type { SynoId } from '../syno-id';
import type { Syno } from '../syno';
import type { Focus } from '../editor-state/focus';

export type PresentSyno = (
  StateSelector,
  LanguageIntegration,
  MutablePresnoMap,
  (SynoId | false),
  (Syno),
  Object,
  (Focus | false),
  PresentSyno,
) => SynoId
