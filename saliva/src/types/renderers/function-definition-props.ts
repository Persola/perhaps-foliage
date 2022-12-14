import type { SynoId } from 'perhaps-foliage/dist/types/syntactic/syno-id';
import type { PresentLangInt } from 'perhaps-foliage/dist/types/language-integration/interfaces/complete/present-lang-int';
import type { Presno } from 'perhaps-foliage/dist/types/presenter/presnos/presno';
import type { PresnoRendererProps } from 'perhaps-foliage/dist/types/renderer/presno-renderer-props';
import type { FunctionDefPres } from '../presentations/function-definition';

export type FunctionDefinitionRendererProps = {
  readonly integration: PresentLangInt;
  readonly getPresno: (synoId: SynoId) => Presno;
  readonly presno: FunctionDefPres;
  readonly PresnoRenderer: (props: PresnoRendererProps) => JSX.Element;
};
