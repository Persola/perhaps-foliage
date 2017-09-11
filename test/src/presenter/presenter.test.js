import Presenter from '../../../src/presenter/presenter.js';

describe ('presenter', () => {
  const editorState = {};
  let editorStateStore;
  let presentationStore;
  let validEditorState = jest.fn();
  let presenter;
  jest.mock(
    '../../../src/presenter/valid-editor-state.js',
    () => true,
    { virtual: true }
  )

  beforeEach(() => {
    editorStateStore = {
      subscribe: jest.fn(),
      getState: jest.fn().mockReturnValue(editorState)
    };
    presentationStore = {
      dispatch:  jest.fn()
    };
    presenter = new Presenter(editorStateStore, presentationStore, validEditorState);
  })

  describe ('constructor', () => {
    it ('saves a reference to the editorStateStore', () => {
      expect(presenter.editorStateStore).toBe(editorStateStore)
    })

    it ('saves a reference to the presentationStore', () => {
      expect(presenter.presentationStore).toBe(presentationStore)
    })

    it ('saves a reference to the validEditorState', () => {
      expect(presenter.validEditorState).toBe(validEditorState)
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
      presenter.presentationStore.dispatch = jest.fn();
      presenter.present();
    })

    it ('fetches the editor state from its store', () => {
      expect(presenter.editorStateStore.getState).toHaveBeenCalled();
    })

    it ('fetches the editor state from its store', () => {
      expect(presenter.generatePresentation).toHaveBeenCalledWith(editorState);
    })

    it ('saves a reference to the presentationStore', () => {
      expect(presentationStore.dispatch).toHaveBeenCalledWith({
        type: 'RENDER',
        presentation
      })
    })
  })

  describe ('generatePresentation', () => {
    describe ('when the editor state is deemed valid', () => {
      beforeEach(() => {
        validEditorState = jest.fn().mockReturnValue(true);
        presenter = new Presenter(editorStateStore, presentationStore, validEditorState);
      })

      it ('validate the editor state provided using validEditorState', () => {
        expect(presenter.generatePresentation(editorState)).toBe(editorState);
      })
    })

    describe ('when the editor state is deemed invalid', () => {
      beforeEach(() => {
        validEditorState = jest.fn().mockReturnValue(false);
        presenter = new Presenter(editorStateStore, presentationStore, validEditorState);
      })

      it ('validate the editor state provided using validEditorState', () => {
        expect(() => {
          presenter.generatePresentation(editorState)
        }).toThrowError();
      })
    })
  })
})
