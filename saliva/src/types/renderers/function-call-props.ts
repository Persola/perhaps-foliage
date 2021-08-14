import type { SynoId } from 'saliva-repl/dist/types/syntactic/syno-id';
import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';
import type { Presno } from 'saliva-repl/dist/types/presenter/presno';
import type { SynoRendererProps } from 'saliva-repl/dist/types/renderer/syno-renderer-props';
import type { FunctionCallPres } from '../presentations/function-call';

export type FunctionCallRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (synoId: SynoId) => Presno;
  readonly presno: FunctionCallPres;
  readonly SynoRenderer: (props: SynoRendererProps) => JSX.Element;
};
