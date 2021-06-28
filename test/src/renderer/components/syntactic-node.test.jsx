import * as React from 'react';
import { shallow } from 'enzyme';
import SyntacticNode from '../../../../src/renderer/components/syntactic-node.jsx';
import expectSnapshotMatch from '../../../expect-snapshot-match.js';

const presno = require('../../../data-mocks/presentations/boolean-literal.json');

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
