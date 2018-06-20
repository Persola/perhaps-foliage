// @flow
export type htmlElement = {
  parentElement: htmlElement,
  className: string,
  attributes: {
    'data-syno-id': string
  }
}
