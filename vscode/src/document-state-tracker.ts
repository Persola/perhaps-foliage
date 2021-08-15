import type { SynoMap } from 'saliva-repl/dist/types/syntactic/syno-map';
import type { StateSelector } from 'saliva-repl/dist/types/state-selector';

export default class DocumentStateTracker {
  public constructor() {
    this._stateSelector = null;
  }

  private _stateSelector: (StateSelector | null);

  public setStateSelector(stateSelector: StateSelector): void {
    this._stateSelector = stateSelector;
  }

  public getState(): SynoMap {
    if (this._stateSelector === null) {
      throw new Error('Document state has not been set yet');
    }

    return this._stateSelector.synoMap();
  }
}
