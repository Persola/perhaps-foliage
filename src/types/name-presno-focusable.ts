import type { Syno } from "./syno";
import type { StateSelector } from "./state-selector";
export type NamePresnoFocusable = Readonly<Record<string, (arg0: Syno, arg1: StateSelector) => boolean>>;