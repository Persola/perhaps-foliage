// @flow
export type reduxAction = {
  type: ('UPDATE' | 'UPDATE_RESULT'), // doesn't work
  value?: number,
  result?: Object
}
