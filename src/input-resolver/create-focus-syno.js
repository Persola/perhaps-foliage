// @flow
import type { ReduxStore } from '../types/redux-store';

const isSyno = el => {
  if (!el) { return false; }
  return !!(el.className.split(' ').find(className => (className === 'syno')));
};

const containingSyno = (clickedEl: EventTarget) => {
  if (!(clickedEl instanceof HTMLElement)) {
    throw new Error('non-HTML element clicked');
  }
  let currentEl = clickedEl;
  while (
    currentEl
    && !isSyno(currentEl)
    && currentEl !== document.documentElement
  ) {
    if (!(currentEl instanceof HTMLElement)) {
      throw new Error('hit non-HTML element');
    }
    currentEl = currentEl.parentElement;
  }

  return (isSyno(currentEl) ? currentEl : false);
};

export default (editorStateStore: ReduxStore): ((Event) => void) => (
  (event: Event) => {
    const syno = containingSyno(event.target);

    if (syno) {
      editorStateStore.dispatch({
        type: 'SET_FOCUS_SYNO',
        synoId: String(syno.attributes.getNamedItem('data-syno-id').nodeValue),
      });
    }
  }
);
