export type Presenters = Readonly<
  {
    [syntype: string]: (...args: Array<unknown>) => {
      syntype: string;
      [index: string]: unknown;
    }
  }
>;
