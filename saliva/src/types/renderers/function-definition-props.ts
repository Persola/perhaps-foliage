import type { SynoId } from 'saliva-repl/dist/types/syntactic/syno-id';
import type { PresentLangInt } from 'saliva-repl/dist/types/language-integration/interfaces/complete/present-lang-int';
import type { Presno } from 'saliva-repl/dist/types/presenter/presno';
import type { PresnoRendererProps } from 'saliva-repl/dist/types/renderer/presno-renderer-props';
import type { FunctionDefPres } from '../presentations/function-definition';

export type FunctionDefinitionRendererProps = {
  readonly integration: PresentLangInt;
  readonly getPresno: (synoId: SynoId) => Presno;
  readonly presno: FunctionDefPres;
  readonly PresnoRenderer: (props: PresnoRendererProps) => JSX.Element;
};
