// @flow
import Mousetrap from 'mousetrap';
import presenter from './presenter/presenter.js';
import Renderer from './renderer/renderer.jsx';
import editorStateStore from './editor-state-store.js';
import createInterpretForStore from './interpreter/create-interpret-for-store.js'

require('./stylesheet.sass');

const interpret = createInterpretForStore(editorStateStore);
const renderer = new Renderer(document, interpret);
new presenter(editorStateStore, renderer);

const entry = () => {
  editorStateStore.dispatch({ type: 'INITIALIZE' });
  [false, true].forEach(boolean => {
    Mousetrap.bind(String(Number(boolean)), () => {
      const newStageful = {
        klass: 'booleanLiteral',
        value: boolean
      }
      editorStateStore.dispatch({ type: 'UPDATE', stageful: newStageful });
    });
  });
  Mousetrap.bind('enter', () => {
    interpret();
  });
};

window.addEventListener('load', () => { entry(); });
