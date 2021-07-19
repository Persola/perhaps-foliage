// @flow
import * as React from 'react';

import type { NamePartProps } from '../../../../types/renderer/name-part-props';
import type { SynoId } from '../../../../types/syno-id';
import type { Presno } from '../../../../types/presenter/presno';
import type { PresentLanguageIntegration } from '../../../../types/language-integration/present-language-integration';
import type { SynoRendererProps } from '../../../../types/renderer/syno-renderer-props';
import type { VariableRefPres } from '../presentations/variable-ref';

export type VariableRefRendererProps = {|
  +NamePart: React.ComponentType<NamePartProps>,
  +integration: PresentLanguageIntegration,
  +getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  +presno: VariableRefPres,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}
