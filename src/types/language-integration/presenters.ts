export type Presenters = Readonly<
  Record<
    string,
    (...args: Array<unknown>) => {
      syntype: string;
      [index: string]: unknown;
    }
  >
>;
