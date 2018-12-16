import Presenter from '../../../src/presenter/presenter.js';

describe ('presenter', () => {
  const focusedNode = {};
  const resultGraph = {};
  const resultOutdated = false;
  const interpreting = false;
  const editorState = {
    synoMap: {
      trial: focusedNode,
      reward: resultGraph
    },
    stagedGraphKey: 'trial',
    resultGraphKey: 'reward',
    resultOutdated,
    interpreting
  };
  let editorStateStore;
  let renderer = { render: jest.fn() };
  let presenter;
  let presentation;

  beforeEach(() => {
    editorStateStore = {
      subscribe: jest.fn(),
      getState: jest.fn().mockReturnValue(editorState),
    };
    presenter = new Presenter(editorStateStore, renderer);
  })

  describe ('constructor', () => {
    it ('saves a reference to the editorStateStore', () => {
      expect(presenter.editorStateStore).toBe(editorStateStore)
    })

    it ('saves a reference to the renderer', () => {
      expect(presenter.renderer).toBe(renderer)
    })

    it ('subscribes to the editorStateStore with its present method', () => {
      const subscribeCallback = editorStateStore.subscribe.mock.calls[0][0];
      expect(subscribeCallback.name).toBe('bound present');
    })
  })

  describe ('present', () => {
    let presentation;

    beforeEach(() => {
      presentation = { mockPresentation: true };
      presenter.generatePresentation = jest.fn().mockReturnValue(presentation);
      presenter.present();
    })

    it ('fetches the editor state from its store', () => {
      expect(presenter.editorStateStore.getState).toHaveBeenCalled();
    })

    it ('generates the presentation', () => {
      expect(presenter.generatePresentation).toHaveBeenCalledWith(editorState);
    })

    it ('renders the presentation', () => {
      expect(renderer.render).toHaveBeenCalledWith(presentation, resultOutdated, interpreting);
    })
  })

  describe ('generatePresentation', () => {
    beforeEach(() => {
      presentation = presenter.generatePresentation(editorState);
    })

    xit ('sets the stage using the stagedGraphKey and focusedNodePath', () => {
      expect(presentation.stage).toBe(focusedNode);
    })

    xit ('sets the result using the resultGraphKey', () => {
      expect(presentation.result).toBe(resultGraph);
    })
  })
})
