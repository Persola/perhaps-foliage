// @flow

export default <Type>(value: Type): Type => {
  const jsond = JSON.stringify(value);
  return (jsond === undefined ? jsond : JSON.parse(jsond));
};
