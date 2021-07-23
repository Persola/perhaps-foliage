import type { Grammar } from "../editor-state/grammar";
import type { SynoMap } from "../syno-map";
import type { KeyToNewSynoAttrs } from "./key-to-new-syno-attrs";
import type { EditorStateWithIntegration } from "../editor-state/editor-state-with-integration";
import type { StateSelector } from "../state-selector";
import type { InterpretationResolution } from "../interpreter/interpretation-resolution";
export type PresentLanguageIntegration = {
  id: string;
  grammar: Grammar;
  primitives: SynoMap | null | undefined;
  keyToNewSynoAttrs: KeyToNewSynoAttrs;
  interpret: ((arg0: EditorStateWithIntegration, arg1: StateSelector) => InterpretationResolution) | null | undefined;
  presenters: Readonly<Record<string, (...args: Array<any>) => any>>;
  renderers: Readonly<Record<string, (...args: Array<any>) => any>>;
  styles: {
    use: () => void;
    unuse: () => void;
  };
};