// @flow

export default <Type>(value: Type): Type => {
  return JSON.parse(
    JSON.stringify(value)
  )
}
