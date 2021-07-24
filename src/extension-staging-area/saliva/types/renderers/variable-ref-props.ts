import * as React from "react";
import type { SynoId } from "../../../../types/syno-id";
import type { Presno } from "../../../../types/presenter/presno";
import type { PresentLanguageIntegration } from "../../../../types/language-integration/present-language-integration";
import type { SynoRendererProps } from "../../../../types/renderer/syno-renderer-props";
import type { VariableRefPres } from "../presentations/variable-ref";
export type VariableRefRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (arg0: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  readonly presno: VariableRefPres;
  readonly SynoRenderer: (props: SynoRendererProps) => React.ReactNode;
};
