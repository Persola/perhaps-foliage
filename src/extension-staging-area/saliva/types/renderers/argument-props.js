// @flow
import * as React from 'react';

import type { LanguageIntegration } from '../../../../types/language-integration';
import type { Presno } from '../../../../types/presenter/presno';
import type { SynoId } from '../../../../types/syno-id';
import type { SynoRendererProps } from '../../../../types/syno-renderer-props';
import type { ArgumentPres } from '../presentations/argument';

export type ArgumentRendererProps = {|
  +integration: LanguageIntegration,
  +getPresno: (SynoId) => Presno, // eslint-disable-line react/no-unused-prop-types
  +presno: ArgumentPres,
  +SynoRenderer: (props: SynoRendererProps) => React.Node,
|}
