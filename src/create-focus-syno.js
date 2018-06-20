// @flow
import type { reduxStore } from './types/redux-store'
import type { htmlElement } from './types/html-element.js'

const isSyno = (el) => {
  if (!el) { return false };
  return !!(el.className.split(' ').find((className) => {
    return (className === 'syno')
  }))
};

const containingSyno = (clickedEl: EventTarget) => {
  if (!(clickedEl instanceof HTMLElement)) {
    throw new Error('non-HTML element clicked');
  }
  let currentEl = clickedEl;
  while(
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

export default (editorStateStore: reduxStore) => {
  return (event: Event) => {
    const syno = containingSyno(event.target);

    if (syno) {
      editorStateStore.dispatch({
        type: 'SET_FOCUS_SYNO',
        synoId: String(syno.attributes.getNamedItem('data-syno-id').nodeValue)
      });
    }
  }
};
