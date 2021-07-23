import type { StateSelector } from "../state-selector";
import type { PresentLanguageIntegration } from "../language-integration/present-language-integration";
import type { MutablePresnoMap } from "./mutable-presno-map";
import type { SynoId } from "../syno-id";
import type { Syno } from "../syno";
import type { Focus } from "../editor-state/focus";
export type PresentSyno = (arg0: StateSelector, arg1: PresentLanguageIntegration, arg2: MutablePresnoMap, arg3: SynoId | null | undefined, arg4: Syno, arg5: Record<string, any>, arg6: Focus | null | undefined, arg7: PresentSyno) => SynoId;