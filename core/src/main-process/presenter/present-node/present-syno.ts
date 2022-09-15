import StateSelector from '../../state-interface/state-selector';

import enstackChildPresnos from './enstack-child-presnos';
import focuses from './focuses';

import type { SynPresnoArgs } from '../../../types/presenter/presno-args/syn-presno-args';
import type { Focus } from '../../../types/editor-state/focus';
import type { MainsidePresentLangInt } from '../../../types/language-integration/interfaces/mainside/mainside-present-lang-int';
import type { SynPresno } from '../../../types/presenter/presnos/presno';
import type { EnstackForPresentation } from '../../../types/presenter/enstack-for-presentation';
import SyntaxTree from '../../state-interface/syntactic-interface/readable/syntax-tree';

export default (
  synPresnoArgs: SynPresnoArgs,
  state: StateSelector,
  tree: SyntaxTree,
  integration: MainsidePresentLangInt,
  focus: Focus | null,
  enstackForPresentation: EnstackForPresentation,
): SynPresno => {
  const { synoId } = synPresnoArgs;
  const syno = tree.getSyno(synoId);

  const integrationPresenter = integration.presenters[syno.type];
  if (!(integrationPresenter instanceof Function)) {
    throw new Error(
      `Missing language integration  presenter for syntactic node type '${syno.type}'`,
    );
  }

  const validator = integration.synoValidators[syno.type];
  if (!(validator instanceof Function)) {
    throw new Error(
      `Missing language integration validator for syntactic node type '${syno.type}'`,
    );
  }

  const [
    attrsFromIntegration,
    childPresnoArgsFromIntegration,
  ] = integrationPresenter(
    syno,
    state,
  );

  const childPresnoRefs = enstackChildPresnos(
    syno,
    integration,
    focus,
    childPresnoArgsFromIntegration,
    enstackForPresentation,
  );

  const parent = (
    syno.parent() === null
      ? null
      : {
        presnoRef: true,
        id: syno.parent().id,
      }
  );

  return {
    ...attrsFromIntegration,
    ...focuses(focus, synoId),
    id: String(synoId),
    prestype: syno.type,
    parent,
    children: childPresnoRefs,
    valid: validator(syno, state),
  };
};
