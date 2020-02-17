import { Step } from '../interfaces/step.interface';
import { SectionValidator } from '../libs/section-validators/section-validator';
import { Section } from '../interfaces/section.interface';
import { CodeBlock } from '../interfaces/block-code.interface';

export class SectionModel implements Section, CodeBlock {
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
