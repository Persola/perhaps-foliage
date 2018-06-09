// @flow
// $FlowFixMe
export default (value: any[]): any[] => {
  JSON.parse(
    JSON.stringify(value)
  )
}
