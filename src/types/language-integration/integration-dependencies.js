// @flow
import * as React from 'react';

import type { ReactType } from '../react';
import type { NamePartProps } from '../renderer/name-part-props';

export type IntegrationDependencies = {|
  +React: ReactType,
  +components: {|
    +NamePart: React.ComponentType<NamePartProps>,
  |}
|}
