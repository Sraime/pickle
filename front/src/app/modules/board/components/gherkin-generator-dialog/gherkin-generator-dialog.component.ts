import { Component, OnInit } from '@angular/core';
import { Feature } from '../../interfaces/feature.interface';
import { FeatureAssemblyService } from '../../services/feature-assembly/feature-assembly.service';
import { MatDialogRef } from '@angular/material';
import { GherkinCodeGeneratorService } from '../../services/gherkin-code-generator/gherkin-code-generator.service';

@Component({
	selector: 'app-gherkin-generator-dialog',
	templateUrl: './gherkin-generator-dialog.component.html',
	styleUrls: ['./gherkin-generator-dialog.component.scss']
})
export class GherkinGeneratorDialogComponent implements OnInit {
	private feature: Feature;
	public featureCode: string = '';

	constructor(
		private featureAssembly: FeatureAssemblyService,
		private codeGenerator: GherkinCodeGeneratorService,
		public dialogRef: MatDialogRef<GherkinGeneratorDialogComponent>
	) {}

	ngOnInit() {
		this.feature = this.featureAssembly.getAssembledFeature();
		this.featureCode = GherkinCodeGeneratorService.generateFeatureCode(this.feature);
	}
}
