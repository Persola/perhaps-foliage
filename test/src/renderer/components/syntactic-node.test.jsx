import * as React from 'react';
import { shallow } from 'enzyme';
import SyntacticNode from '../../../../src/renderer/components/syntactic-nodex';
import expectSnapshotMatch from '../../../expect-snapshot-match';

import presno from '../../../data-mocks/presentations/boolean-literalon';

describe ('SyntacticNode', () => {
  const synoId = 'berry-ford'
  const validProps = {
    getPresno: synoIdArg => {
      if (synoIdArg === synoId) { return presno }
    },
    synoId
  }

  it ('renders', () => {
    expectSnapshotMatch(
      <SyntacticNode {...validProps} />
    );
  });

  it ('errors on unrecognized syntypes', () => {
    const badSyntype = 'badSyntype'
    const badTypeSyno = Object.assign({}, validProps.codePresentation, {
      syntype: badSyntype
    })
    const badSyntypeProps = {
      getPresno: synoIdArg => {
        if (synoIdArg === synoId) { return badTypeSyno }
      },
      synoId
    }

    expect( () => {
      shallow(
        <SyntacticNode {...badSyntypeProps} />
      )
    }).toThrow(`unrecognized type: '${badSyntype}'`);
  });
})
