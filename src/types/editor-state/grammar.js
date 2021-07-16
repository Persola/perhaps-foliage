// @flow
import type { Syntype } from '../../extension-staging-area/saliva/types/synos/syntype';

export type Grammar = {
  +[Syntype]: {
    +rootable: boolean,
    +textHostRef: (false | string),
    +children: {
      +[string]: {
        +collection: boolean,
        +syntype: Syntype
      }
    }
  }
}
