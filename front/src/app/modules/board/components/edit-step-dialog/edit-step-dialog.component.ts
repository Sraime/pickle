import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Step } from '../../interfaces/step.interface';

@Component({
	selector: 'app-edit-step-dialog',
	templateUrl: './edit-step-dialog.component.html',
	styleUrls: ['./edit-step-dialog.component.scss']
})
export class EditStepDialogComponent implements OnInit {
	private editedStepName = 'hello';

	constructor(private dialogRef: MatDialogRef<EditStepDialogComponent>, @Inject(MAT_DIALOG_DATA) public step: Step) {}

	ngOnInit() {
		this.editedStepName = this.step.name;
	}

	saveAction() {
		this.dialogRef.close({ name: this.editedStepName });
	}

	cancelAction() {
		this.dialogRef.close(this.step);
	}
}
