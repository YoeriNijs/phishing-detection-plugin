export interface ICommunity {
  publicName(): string;
  fetch(): Promise<string[]>;
}
