// @flow
import * as React from 'react';

import type { PresentLanguageIntegration } from '../../../../types/language-integration/present-language-integration';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoId } from '../../../../types/syno-id';
import type { SynoRendererProps } from '../../../../types/renderer/syno-renderer-props';
import type { ArgumentPres } from '../presentations/argument';

export type ArgumentRendererProps = {|
  +integration: PresentLanguageIntegration,
  +getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  +presno: ArgumentPres,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}
