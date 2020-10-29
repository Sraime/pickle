import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
} from "@angular/core";
import { MatInput } from "@angular/material/input";

@Component({
  selector: "edit-text",
  templateUrl: "./edit-text.component.html",
  styleUrls: ["./edit-text.component.scss"],
})
export class EditTextComponent implements OnInit {
  @ViewChild("inputText", { static: false })
  inputText: ElementRef;

  @Input()
  text = "";

  @Input()
  placeholder = "your text here";

  @Output("update")
  saveEvent = new EventEmitter();

  @Input("editModeEnabled")
  isEditMode = false;

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {}

  switchEditMode() {
    this.isEditMode = !this.isEditMode;
    this.changeDetectorRef.detectChanges();
    if (!this.isEditMode) {
      this.saveEvent.emit(this.text);
    } else {
      this.inputText.nativeElement.focus();
    }
  }
}
