import { GherkinCodeGeneratorService } from './gherkin-code-generator.service';
import { Scenario } from '../../interfaces/scenario.interface';
import { Feature } from '../../interfaces/feature.interface';
import { Step } from '../../interfaces/step.interface';

describe('GerkinCodeGenerator', () => {
	describe('generateFeatureCode()', () => {
		it('should return Feature code with the name when scenarios is empty', () => {
			const f: Feature = { name: 'simple', scenarios: [] };
			const code: string = GherkinCodeGeneratorService.generateFeatureCode(f);
			expect(code).toEqual('Feature: simple');
		});

		it('should return Feature code with the name when scenarios is null', () => {
			const f: Feature = { name: 'simple', scenarios: null };
			const code: string = GherkinCodeGeneratorService.generateFeatureCode(f);
			expect(code).toEqual('Feature: simple');
		});

		it('should return an empty string when the feature is null', () => {
			const code: string = GherkinCodeGeneratorService.generateFeatureCode(null);
			expect(code).toEqual('');
		});
	});
	describe('generateScenarioCode', () => {
		it('should return only the label when when scenario is null', () => {
			const s: Scenario = null;

			const code: string = GherkinCodeGeneratorService.generateScenarioCode(s);
			expect(code).toEqual(`

Scenario: `);
		});

		it('should return a scenario with a name when sections are empty', () => {
			const s: Scenario = {
				name: 's1',
				givenSteps: [],
				whenSteps: [],
				thenSteps: []
			};

			const code: string = GherkinCodeGeneratorService.generateScenarioCode(s);
			expect(code).toEqual(`

Scenario: s1`);
		});

		it('should return a scenario with a name when sections are null', () => {
			const s: Scenario = {
				name: 's1',
				givenSteps: null,
				whenSteps: null,
				thenSteps: null
			};

			const code: string = GherkinCodeGeneratorService.generateScenarioCode(s);
			expect(code).toEqual(`

Scenario: s1`);
		});

		it('should add spacing before then scenario', () => {
			const s: Scenario = {
				name: 's1',
				givenSteps: null,
				whenSteps: null,
				thenSteps: null
			};

			const code: string = GherkinCodeGeneratorService.generateScenarioCode(s, 2);
			expect(code).toEqual(`

  Scenario: s1`);
		});
	});

	describe('generateSectionCode', () => {
		it('should return an empty string when it is null', () => {
			const section: Step[] = null;
			const code = GherkinCodeGeneratorService.generateSectionCode('Given', section);
			expect(code).toEqual('');
		});

		it('should return an empty string when it is empty', () => {
			const section: Step[] = [];
			const code = GherkinCodeGeneratorService.generateSectionCode('Given', section);
			expect(code).toEqual('');
		});

		it('should a on line step liste with the give section name', () => {
			const section: Step[] = [{ name: 'step1' }];
			const code = GherkinCodeGeneratorService.generateSectionCode('Given', section);
			expect(code).toEqual(`
Given step1`);
		});

		it('should add an string step when the step is null', () => {
			const section: Step[] = [null];
			const code = GherkinCodeGeneratorService.generateSectionCode('Given', section);
			expect(code).toEqual(`
Given `);
		});

		it('should use the And keywork for the step the second step', () => {
			const section: Step[] = [{ name: 'step1' }, { name: 'step2' }];
			const code = GherkinCodeGeneratorService.generateSectionCode('Given', section);
			expect(code).toEqual(`
Given step1
And step2`);
		});

		it('should add spacing before each step', () => {
			const section: Step[] = [{ name: 'step1' }, { name: 'step2' }];
			const code = GherkinCodeGeneratorService.generateSectionCode('Given', section, 2);
			expect(code).toEqual(`
  Given step1
  And step2`);
		});
	});
});
