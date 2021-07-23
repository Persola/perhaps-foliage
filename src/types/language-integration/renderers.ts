// @flow
import * as React from 'react';

export type Renderers = {
  +[string]: React.ComponentType<{ [string]: any }>
}
