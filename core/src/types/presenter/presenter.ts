export type Presenter = (...args: Array<unknown>) => {
  syntype: string;
  [index: string]: unknown;
};
