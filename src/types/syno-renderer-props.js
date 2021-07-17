// @flow
import * as React from 'react';

import type { LanguageIntegration } from './language-integration';
import type { SynoId } from './syno-id';
import type { Presno } from './presenter/presno';

export type SynoRendererProps = {|
  +integration: LanguageIntegration,
  +getPresno: (SynoId) => Presno,
  +synoId: SynoId,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}
