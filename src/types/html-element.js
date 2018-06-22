// @flow
export type HtmlElement = {
  parentElement: HtmlElement,
  className: string,
  attributes: {
    'data-syno-id': string
  }
}
