type Props<CachePayload> = {
  key: string;
  payload: CachePayload;
};

export class CacheItem<CachePayload> {
  constructor(private _props: Props<CachePayload>) {}

  get key(): string {
    return this._props.key;
  }
  get payload(): CachePayload {
    return this._props.payload;
  }
  get payloadJsonString(): string {
    return JSON.stringify(this._props.payload);
  }
}
