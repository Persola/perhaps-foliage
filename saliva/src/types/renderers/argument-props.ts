import type { PresentLangInt } from 'perhaps-foliage/dist/types/language-integration/interfaces/complete/present-lang-int';
import type { Presno } from 'perhaps-foliage/dist/types/presenter/presnos/presno';
import type { SynoId } from 'perhaps-foliage/dist/types/syntactic/syno-id';
import type { PresnoRendererProps } from 'perhaps-foliage/dist/types/renderer/presno-renderer-props';
import type { ArgumentPres } from '../presentations/argument';

export type ArgumentRendererProps = {
  readonly integration: PresentLangInt;
  readonly getPresno: (synoId: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  readonly presno: ArgumentPres;
  readonly PresnoRenderer: (props: PresnoRendererProps) => JSX.Element;
};
