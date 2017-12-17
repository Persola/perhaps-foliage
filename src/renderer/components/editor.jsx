// @flow
import React from 'react';
import CodeStage from './code-stage.jsx';
import InterpretButton from './interpret-button.jsx';
import type { presentation } from '../../types/presentation' // eslint-disable-line no-unused-vars

type Props = {
  presentation: presentation,
  interpret: Function
}

export default (props: Props) => {
  const { presentation: { stageful, result }, interpret } = props;

  return (
    <div className="editor mousetrap">
      <CodeStage key="code" stageful={stageful} />
      <InterpretButton interpret={interpret} />
      <CodeStage key="result" stageful={result || false} />
    </div>
  );
};
