import type { SynoId } from 'saliva-repl/dist/types/syntactic/syno-id';
import type { PresentLangInt } from 'saliva-repl/dist/types/language-integration/interfaces/complete/present-lang-int';
import type { Presno } from 'saliva-repl/dist/types/presenter/presno';
import type { PresnoRendererProps } from 'saliva-repl/dist/types/renderer/presno-renderer-props';
import type { BooleanLiteralPres } from '../presentations/boolean-literal';

export type BooleanLiteralRendererProps = {
  readonly integration: PresentLangInt;
  readonly getPresno: (synoId: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  readonly presno: BooleanLiteralPres;
  readonly PresnoRenderer: (props: PresnoRendererProps) => JSX.Element;
};
