import type { SynoId } from '../syntactic/syno-id';
import type { PresentLangInt } from '../language-integration/interfaces/complete/present-lang-int';
import type { Presno } from '../presenter/presno';
import type { PresnoRendererProps } from './presno-renderer-props';

export type SharedRendererProps = {
  readonly integration: PresentLangInt;
  readonly getPresno: (synoId: SynoId) => Presno;
  readonly presno: Presno;
  readonly PresnoRenderer: (props: PresnoRendererProps) => JSX.Element;
};
