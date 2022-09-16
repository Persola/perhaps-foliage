import StateSelector from 'perhaps-foliage/dist/main-process/state-interface/state-selector';
import { RawSyntaxTree } from 'perhaps-foliage/dist/types/syntactic/raw/raw-syntax-tree';

export default class DocumentStateTracker {
  public constructor() {
    this._stateSelector = null;
  }

  private _stateSelector: (StateSelector | null);

  public setStateSelector(stateSelector: StateSelector): void {
    this._stateSelector = stateSelector;
  }

  public getState(): RawSyntaxTree {
    console.log(this && null);
    throw new Error('unimplemented');
  }
}
