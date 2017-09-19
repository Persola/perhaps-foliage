import Presenter from '../../../src/presenter/presenter.js';

describe ('presenter', () => {
  const editorState = {};
  let editorStateStore;
  let renderer = { render: jest.fn() };
  let presenter;

  beforeEach(() => {
    editorStateStore = {
      subscribe: jest.fn(),
      getState: jest.fn().mockReturnValue(editorState)
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
    const presentation = {};

    beforeEach(() => {
      presenter.generatePresentation = jest.fn().mockReturnValue(presentation);
      presenter.present();
    })

    it ('fetches the editor state from its store', () => {
      expect(presenter.editorStateStore.getState).toHaveBeenCalled();
    })

    it ('generates the presentation', () => {
      expect(presenter.generatePresentation).toHaveBeenCalledWith(editorState);
    })

    it ('generates the presentation', () => {
      const presentation = {};
      presenter.generatePresentation = (
        jest.fn().mockReturnValueOnce(presentation)
      );

      expect(renderer.render).toHaveBeenCalledWith(presentation);
    })
  })

  describe ('generatePresentation', () => {
    it ('is the identity function', () => {
      expect(presenter.generatePresentation(editorState)).toBe(editorState);
    })
  })
})
