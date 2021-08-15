import type { StateSelector } from './state-selector';
import type { SynoMap } from './syntactic/syno-map';

export interface DocumentStateTrackerInterface {
  setStateSelector(stateSelector: StateSelector): void,
  getState(): SynoMap,
}
