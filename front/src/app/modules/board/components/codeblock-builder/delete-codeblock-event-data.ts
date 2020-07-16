export class DeleteCodeblockEventData {
  constructor(private _codeBlockId: string) {}

  get codeBlockId() {
    return this._codeBlockId;
  }
}
