export type Olympian = {
  readonly id: number;
  readonly syntype: 'olympian';
  readonly parent: SynoRef;
  readonly child: SynoRef;
  readonly name: string;
};
