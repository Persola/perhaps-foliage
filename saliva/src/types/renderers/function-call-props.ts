import type { SynoId } from 'perhaps-foliage/dist/types/syntactic/syno-id';
import type { PresentLangInt } from 'perhaps-foliage/dist/types/language-integration/interfaces/complete/present-lang-int';
import type { Presno } from 'perhaps-foliage/dist/types/presenter/presno';
import type { PresnoRendererProps } from 'perhaps-foliage/dist/types/renderer/presno-renderer-props';
import type { FunctionCallPres } from '../presentations/function-call';

export type FunctionCallRendererProps = {
  readonly integration: PresentLangInt;
  readonly getPresno: (synoId: SynoId) => Presno;
  readonly presno: FunctionCallPres;
  readonly PresnoRenderer: (props: PresnoRendererProps) => JSX.Element;
};
