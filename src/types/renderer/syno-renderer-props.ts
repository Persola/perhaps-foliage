import * as React from "react";
import type { PresentLanguageIntegration } from "../language-integration/present-language-integration";
import type { SynoId } from "../syno-id";
import type { Presno } from "../presenter/presno";
export type SynoRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (arg0: SynoId) => Presno;
  readonly synoId: SynoId;
  readonly SynoRenderer: (props: SynoRendererProps) => React.ReactNode;
};
