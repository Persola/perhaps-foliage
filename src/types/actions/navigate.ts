// @flow
export type Navigate = {|
  +type: 'NAVIGATE',
  +direction: ('out' | 'in' | 'prev' | 'next'),
|}
