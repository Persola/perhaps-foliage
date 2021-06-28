// @flow
import type { GrammarName } from '../editor-state/grammar-name.js';
import type { PresnoMap } from './presno-map.js';
import type { SynoId } from '../syno-id.js';
import type { Syno } from '../syno.js';
import type { Focus } from '../editor-state/focus.js';

export type PresentSyno = (
  GrammarName,
  PresnoMap,
  (SynoId | false),
  (Syno),
  Object,
  Function,
  (Focus | false),
  PresentSyno,
) => SynoId
