// @flow
import type { StateSelector } from '../state-selector.js';
import type { GrammarName } from '../editor-state/grammar-name.js';
import type { MutablePresnoMap } from './mutable-presno-map.js';
import type { SynoId } from '../syno-id.js';
import type { Syno } from '../syno.js';
import type { Focus } from '../editor-state/focus.js';

export type PresentSyno = (
  StateSelector,
  GrammarName,
  MutablePresnoMap,
  (SynoId | false),
  (Syno),
  Object,
  (Focus | false),
  PresentSyno,
) => SynoId
