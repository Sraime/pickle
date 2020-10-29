import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Step } from "../../services/updaters/section-updater/section-updater.service";

@Component({
  selector: "app-edit-step-dialog",
  templateUrl: "./edit-step-dialog.component.html",
  styleUrls: ["./edit-step-dialog.component.scss"],
})
export class EditStepDialogComponent implements OnInit {
  editedStepName = "hello";

  constructor(
    private dialogRef: MatDialogRef<EditStepDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public step: Step
  ) {
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close(this.step);
    });
  }

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
