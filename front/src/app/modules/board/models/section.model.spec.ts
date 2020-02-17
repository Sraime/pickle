import { SectionModel } from './section.model';
import { SectionValidator } from '../libs/section-validators/section-validator';
import { Step } from '../interfaces/step.interface';

describe('section model', () => {
	it('should set the step list to an empty array when null is given', () => {
		const sm = new SectionModel('Given', 'S1', null);
		expect(sm.steps).toEqual([]);
	});

	it('should have getters for name and codeBlockId', () => {
		const sm = new SectionModel('Given', 'S1', null);
		expect(sm.name).toEqual('Given');
		expect(sm.codeBlockId).toEqual('S1');
	});
});
