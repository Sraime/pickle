import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Step } from '../../interfaces/step.interface';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { SectionUpdaterService } from '../../services/updaters/section-updater/section-updater.service';
import { SectionModel } from '../../models/section.model';
import { FeatureAssemblyService } from '../../services/feature-assembly/feature-assembly.service';

@Component({
	selector: 'section-steps',
	templateUrl: './section-steps.component.html',
	styleUrls: ['./section-steps.component.scss']
})
export class SectionStepsComponent implements OnInit {
	constructor(
		private sectionService: SectionUpdaterService,
		private featureAssembly: FeatureAssemblyService
	) {}

	hasFocus = false;

	@ViewChild('inputText', { static: false })
	inputText: ElementRef;

	@Input()
	codeBlockId = '';

	@Input()
	sectionName = '';

	steps: Step[] = [];

	ngOnInit() {
		const storedSc = this.featureAssembly.getAssembledScenario(this.codeBlockId);
		if (storedSc) {
			this.steps = storedSc[this.sectionName.toLowerCase() + 'Steps'];
		}
		this.sectionService.getSectionObservable(this.sectionName).subscribe((sectionUpdate) => {
			if (sectionUpdate.codeBlockId === this.codeBlockId) {
				this.steps = sectionUpdate.steps;
			}
		});
	}

	addStep() {
		if (this.inputText.nativeElement.value) {
			this.steps.push({ name: this.inputText.nativeElement.value });
			this.sectionService.updateSection(
				new SectionModel(this.sectionName, this.codeBlockId, this.steps)
			);
			this.inputText.nativeElement.value = '';
		}
	}

	delStep(step: Step) {
		const index = this.steps.findIndex((s) => s.name === step.name);
		this.steps.splice(index, 1);
		this.sectionService.updateSection(
			new SectionModel(this.sectionName, this.codeBlockId, this.steps)
		);
	}

	dropStep(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
		this.sectionService.updateSection(
			new SectionModel(this.sectionName, this.codeBlockId, this.steps)
		);
	}

	updateStep(updatedStep: Step[]) {
		const index = this.steps.findIndex((s) => s.name === updatedStep[0].name);
		this.steps[index] = updatedStep[1];
		this.sectionService.updateSection(
			new SectionModel(this.sectionName, this.codeBlockId, this.steps)
		);
	}

	switchMode() {
		if (this.hasFocus) {
			this.addStep();
		}
		this.hasFocus = !this.hasFocus;
	}
}
