import { Scenario } from '../../interfaces/scenario.interface';
import { Feature } from '../../interfaces/feature.interface';
import { Step } from '../../interfaces/step.interface';
import { Injectable } from '@angular/core';

export class GherkinCodeGenerator {
	static generateFeatureCode(feature: Feature): string {
		if (!feature) return '';
		let code = 'Feature: ' + feature.name;
		if (feature.scenarios) {
			feature.scenarios.forEach((s) => {
				code += GherkinCodeGenerator.generateScenarioCode(s, 2);
			});
		}
		return code;
	}

	static generateScenarioCode(scenairo: Scenario, spacing: number = 0): string {
		let spaces = '';
		for (let i = 0; i < spacing; i++) spaces += ' ';
		let code = '\n\n' + spaces + 'Scenario: ';
		if (!scenairo) return code;
		code += scenairo.name;
		code += GherkinCodeGenerator.generateSectionCode('Given', scenairo.givenSteps, spacing + 2);
		code += GherkinCodeGenerator.generateSectionCode('When', scenairo.whenSteps, spacing + 2);
		code += GherkinCodeGenerator.generateSectionCode('Then', scenairo.thenSteps, spacing + 2);
		return code;
	}

	static generateSectionCode(sectionName: string, section: Step[], spacing: number = 0): string {
		let code = '';
		let spaces = '';
		for (let i = 0; i < spacing; i++) spaces += ' ';
		if (section) {
			section.forEach((step, index) => {
				code += '\n' + spaces;
				if (index === 0) code += sectionName + ' ' + (step ? step.name : '');
				else code += 'And' + ' ' + (step ? step.name : '');
			});
		}
		return code;
	}
}
