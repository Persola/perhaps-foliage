import type { SynoId } from '../syntactic/syno-id';
import type { PresentLangInt } from '../language-integration/interfaces/complete/present-lang-int';
import type { Presno, SynPresno } from '../presenter/presnos/presno';
import type { PresnoRendererProps } from './presno-renderer-props';

export type SynPresnoRendererProps = {
  readonly integration: PresentLangInt;
  readonly getPresno: (synoId: SynoId) => Presno;
  readonly presno: SynPresno;
  readonly PresnoRenderer: (props: PresnoRendererProps) => JSX.Element;
};
