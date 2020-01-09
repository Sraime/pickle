import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Step } from '../../../interfaces/step';
import { MatDialog } from '@angular/material';
import { EditStepDialogComponent } from '../../edit-step-dialog/edit-step-dialog.component';

@Component({
  selector: 'section-step-item',
  templateUrl: './section-step-item.component.html',
  styleUrls: ['./section-step-item.component.css']
})
export class SectionStepItemComponent implements OnInit {

  constructor(private editDialog: MatDialog) { }

  @Input()
  name = '';

  @Output('delete')
  delEvent: EventEmitter<Step> = new EventEmitter<Step>();

  ngOnInit() {
  }

  delAction() {
    this.delEvent.emit({name: this.name});
  }

  editAction() {
    const dialog = this.editDialog.open(EditStepDialogComponent,
      {
        width: '400px',
        data: {name: this.name}
      }
    );
    dialog.afterClosed().subscribe((updatedValue) => {
      this.name = updatedValue.name;
    });
  }

}
