import type { PresentLanguageIntegration } from 'saliva-repl/dist/types/language-integration/present-language-integration';
import type { Presno } from 'saliva-repl/dist/types/presenter/presno';
import type { SynoId } from 'saliva-repl/dist/types/syntactic/syno-id';
import type { SynoRendererProps } from 'saliva-repl/dist/types/renderer/syno-renderer-props';
import type { ArgumentPres } from '../presentations/argument';

export type ArgumentRendererProps = {
  readonly integration: PresentLanguageIntegration;
  readonly getPresno: (synoId: SynoId) => Presno;
  // eslint-disable-line react/no-unused-prop-types
  readonly presno: ArgumentPres;
  readonly SynoRenderer: (props: SynoRendererProps) => JSX.Element;
};
