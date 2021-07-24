import * as React from "react";
import type { SynoId } from "../../../../types/syno-id";
import type { PresentLanguageIntegration } from "../../../../types/language-integration/present-language-integration";
import type { Presno } from "../../../../types/presenter/presno";
import type { SynoRendererProps } from "../../../../types/renderer/syno-renderer-props";
import type { FunctionCallPres } from "../presentations/function-call";
export type FunctionCallRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (arg0: SynoId) => Presno;
  readonly presno: FunctionCallPres;
  readonly SynoRenderer: (props: SynoRendererProps) => React.ReactNode;
};
