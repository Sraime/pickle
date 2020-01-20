import { Step } from '../interfaces/step';
import { SectionValidator } from '../libs/section-validators/section-validator';

export class SectionModel {
	private _steps: Step[];

	constructor(private _name: string, private _codeBlockId: string, steps: Step[]) {
		this._steps = steps ? steps : [];
	}

	get steps(): Step[] {
		return this._steps;
	}

	get name(): string {
		return this._name;
	}

	get codeBlockId(): string {
		return this._codeBlockId;
	}
}
