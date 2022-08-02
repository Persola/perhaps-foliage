import type { SynoId } from 'perhaps-foliage/dist/types/syntactic/syno-id';
import type { Presno } from 'perhaps-foliage/dist/types/presenter/presno';
import type { PresentLangInt } from 'perhaps-foliage/dist/types/language-integration/interfaces/complete/present-lang-int';
import type { PresnoRendererProps } from 'perhaps-foliage/dist/types/renderer/presno-renderer-props';
import type { VariableRefPres } from '../presentations/variable-ref';

export type VariableRefRendererProps = {
  readonly integration: PresentLangInt;
  readonly getPresno: (synoId: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  readonly presno: VariableRefPres;
  readonly PresnoRenderer: (props: PresnoRendererProps) => JSX.Element;
};
