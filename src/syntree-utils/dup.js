// @flow

export default <Type>(value: Type): Type => {
  return JSON.parse(
    // $FlowFixMe
    JSON.stringify(value)
  )
}
