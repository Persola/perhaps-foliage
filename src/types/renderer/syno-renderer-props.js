// @flow
import * as React from 'react';

import type { PresentLanguageIntegration } from '../language-integration/present-language-integration';
import type { SynoId } from '../syno-id';
import type { Presno } from '../presenter/presno';

export type SynoRendererProps = {|
  +integration: PresentLanguageIntegration,
  +getPresno: (SynoId) => Presno,
  +synoId: SynoId,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}
