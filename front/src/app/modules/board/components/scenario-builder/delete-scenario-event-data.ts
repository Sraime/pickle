export class DeleteScenarioEventData {
	constructor(private _codeBlockId: string) {}

	get codeBlockId() {
		return this._codeBlockId;
	}
}
