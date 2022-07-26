import type { SynoId } from '../syntactic/syno-id';
import type { PresentLanguageIntegration } from '../language-integration/present-language-integration';
import type { Presno } from '../presenter/presno';
import type { PresnoRendererProps } from './presno-renderer-props';

export type SharedRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (synoId: SynoId) => Presno;
  readonly presno: Presno;
  readonly PresnoRenderer: (props: PresnoRendererProps) => JSX.Element;
};
