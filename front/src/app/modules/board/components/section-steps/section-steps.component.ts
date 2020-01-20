import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../../interfaces/step';
import { moveItemInArray, CdkDragDrop } from '@angular/cdk/drag-drop';
import { SectionServiceService } from '../../services/section-service/section-service.service';
import { SectionModel } from '../../models/section.model';

@Component({
	selector: 'section-steps',
	templateUrl: './section-steps.component.html',
	styleUrls: ['./section-steps.component.scss']
})
export class SectionStepsComponent implements OnInit {
	constructor(private sectionService: SectionServiceService) {}

	@Input()
	codeBlockId = '';

	@Input()
	sectionName = '';

	steps: Step[] = [];

	ngOnInit() {
		this.sectionService.getSectionObservable(this.sectionName).subscribe((sectionUpdate) => {
			if (sectionUpdate.codeBlockId === this.codeBlockId) {
				this.steps = sectionUpdate.steps;
			}
		});
	}

	addStep(e) {
		if (e.srcElement.value) {
			this.steps.push({ name: e.srcElement.value });
			this.sectionService.updateSection(new SectionModel(this.sectionName, this.codeBlockId, this.steps));
			e.srcElement.value = '';
		}
	}

	delStep(step: Step) {
		const index = this.steps.findIndex((s) => s.name === step.name);
		this.steps.splice(index, 1);
		this.sectionService.updateSection(new SectionModel(this.sectionName, this.codeBlockId, this.steps));
	}

	dropStep(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
		this.sectionService.updateSection(new SectionModel(this.sectionName, this.codeBlockId, this.steps));
	}
}
