// @flow
import type { Syno } from './syno';
import type { StateSelector } from './state-selector';

export type NamePresnoFocusable = {
  +[string]: (Syno, StateSelector) => boolean
}
